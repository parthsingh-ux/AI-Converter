import crypto from "crypto";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { normalizeWpUrl } from "./wordpressClient.js";

/**
 * Base URL helper
 */
export function getBaseOrigin(urlStr) {
  const clean = normalizeWpUrl(urlStr);
  try {
    const parsed = new URL(clean);
    return parsed.origin;
  } catch (err) {
    return clean;
  }
}

/**
 * Fetch OAuth discovery metadata from standard well-known endpoints
 */
export async function getMcpDiscovery(serverUrl) {
  const origin = getBaseOrigin(serverUrl);
  
  let protectedMeta = {};
  let authServerMeta = {};

  try {
    const resProt = await fetch(`${origin}/.well-known/oauth-protected-resource`, { cache: "no-store" });
    if (resProt.ok) {
      protectedMeta = await resProt.json();
    }
  } catch (err) {
    console.warn("Could not fetch oauth-protected-resource metadata:", err.message);
  }

  try {
    const resAuth = await fetch(`${origin}/.well-known/oauth-authorization-server`, { cache: "no-store" });
    if (resAuth.ok) {
      authServerMeta = await resAuth.json();
    }
  } catch (err) {
    console.warn("Could not fetch oauth-authorization-server metadata:", err.message);
  }

  const authorizationEndpoint = authServerMeta.authorization_endpoint || `${origin}/wp-admin/admin.php?page=novamira-oauth-authorize`;
  const tokenEndpoint = authServerMeta.token_endpoint || `${origin}/wp-json/novamira/v1/oauth/token`;
  const registrationEndpoint = authServerMeta.registration_endpoint || `${origin}/wp-json/novamira/v1/oauth/register`;

  return {
    origin,
    protectedMeta,
    authServerMeta,
    authorizationEndpoint,
    tokenEndpoint,
    registrationEndpoint,
  };
}

/**
 * Perform Dynamic OAuth Client Registration (RFC 7591)
 */
export async function registerMcpClient({ registrationEndpoint, clientName, redirectUri }) {
  if (!registrationEndpoint) return null;
  try {
    const res = await fetch(registrationEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        client_name: clientName || "novamira-mcp-adaantest3-c",
        redirect_uris: [redirectUri],
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Client registration request failed:", err.message);
  }
  return null;
}

/**
 * Generate PKCE Code Verifier & Challenge (S256)
 */
export function generatePkcePair() {
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
  return { verifier, challenge };
}

/**
 * Construct OAuth Authorization URL with PKCE & Dynamic Registration
 */
export async function buildOAuthAuthorizeUrl({ serverUrl, redirectUri, state, clientName }) {
  const discovery = await getMcpDiscovery(serverUrl);
  const { verifier, challenge } = generatePkcePair();

  // Register client dynamically to obtain a valid client_id for WordPress
  const regData = await registerMcpClient({
    registrationEndpoint: discovery.registrationEndpoint,
    clientName,
    redirectUri,
  });

  const clientId = regData?.client_id || "novamira-mcp-adaantest3-c";

  const url = new URL(discovery.authorizationEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "mcp");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");

  return {
    authorizeUrl: url.toString(),
    codeVerifier: verifier,
    tokenEndpoint: discovery.tokenEndpoint,
    origin: discovery.origin,
    clientId,
  };
}

/**
 * Exchange Authorization Code for Access Token via Token Endpoint
 */
export async function exchangeCodeForToken({ tokenEndpoint, code, codeVerifier, redirectUri, clientId }) {
  const bodyParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId || "novamira-mcp-adaantest3-c",
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: bodyParams.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `Token Exchange Failed (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson.error_description || errJson.message) {
        message = errJson.error_description || errJson.message;
      }
    } catch {}
    throw new Error(message);
  }

  return await res.json();
}

/**
 * Send JSON-RPC 2.0 request directly to Novamira MCP Endpoint
 */
export async function callNovamiraMcpRpc({ serverUrl, accessToken, method, params = {} }) {
  const origin = getBaseOrigin(serverUrl);
  const endpoint = `${origin}/wp-json/mcp/novamira-oauth`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `Novamira MCP Error (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson.message) message = errJson.message;
    } catch {}
    throw new Error(message);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(json.error.message || "MCP Tool Execution Failed");
  }
  return json.result;
}

/**
 * Execute page deployment via Novamira MCP connection or Bearer REST endpoints
 */
export async function deployViaMcpToken({ siteUrl, accessToken, pageTitle, pageSlug, pageStatus = "publish", elementorTemplates = {} }) {
  const origin = getBaseOrigin(siteUrl);

  const headerNodes = Array.isArray(elementorTemplates.header) ? elementorTemplates.header : [];
  const contentNodes = Array.isArray(elementorTemplates.content) ? elementorTemplates.content : [];
  const footerNodes = Array.isArray(elementorTemplates.footer) ? elementorTemplates.footer : [];

  const combinedData = [...headerNodes, ...contentNodes, ...footerNodes];
  const elementorJsonString = JSON.stringify(combinedData);

  // 1. Try Direct Novamira MCP JSON-RPC 2.0 Calls
  try {
    const initResult = await callNovamiraMcpRpc({
      serverUrl: siteUrl,
      accessToken,
      method: "initialize",
      params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "ai-converter", version: "1.0.0" } },
    });

    const toolsResult = await callNovamiraMcpRpc({
      serverUrl: siteUrl,
      accessToken,
      method: "tools/list",
      params: {},
    });

    const tools = toolsResult?.tools || [];
    const createTool = tools.find(
      (t) => t.name.includes("create_page") || t.name.includes("create_post") || t.name.includes("page")
    );

    if (createTool) {
      const callResult = await callNovamiraMcpRpc({
        serverUrl: siteUrl,
        accessToken,
        method: "tools/call",
        params: {
          name: createTool.name,
          arguments: {
            title: pageTitle || "AI Generated Page",
            slug: pageSlug || "",
            status: pageStatus,
            elementor_data: elementorJsonString,
          },
        },
      });
      return {
        success: true,
        via: `novamira_mcp_rpc:${createTool.name}`,
        data: callResult,
      };
    }
  } catch (rpcErr) {
    console.warn("Novamira MCP JSON-RPC tool call attempt:", rpcErr.message);
  }

  // 2. Try AI Converter Connector Endpoint (/wp-json/ai-converter/v1/deploy)
  try {
    const connEndpoint = `${origin}/wp-json/ai-converter/v1/deploy`;
    const connRes = await fetch(connEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        pages: [
          {
            title: pageTitle || "AI Generated Elementor Page",
            slug: pageSlug || "",
            status: pageStatus || "publish",
            elementor_data: combinedData,
          },
        ],
      }),
    });

    if (connRes.ok) {
      const connData = await connRes.json();
      if (connData.success && connData.pages?.items?.[0]) {
        const item = connData.pages.items[0];
        return {
          success: true,
          pageId: item.id,
          pageTitle: item.title,
          pageSlug: item.slug,
          pageStatus: pageStatus,
          pageUrl: item.url,
          editUrl: item.edit_url,
          elementorSectionsCount: combinedData.length,
          via: "ai_converter_connector_rest",
        };
      }
    }
  } catch (connErr) {
    console.warn("AI Converter Connector route check failed:", connErr.message);
  }

  // 3. Fallback: Standard WP REST API endpoint with Bearer Token
  const endpoint = `${origin}/wp-json/wp/v2/pages`;
  const payload = {
    title: pageTitle || "AI Generated Elementor Page",
    status: pageStatus || "publish",
    meta: {
      _elementor_data: elementorJsonString,
      _elementor_edit_mode: "builder",
      _elementor_template_type: "wp-page",
      _elementor_version: "3.20.0",
    },
  };

  if (pageSlug && pageSlug.trim()) {
    payload.slug = pageSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errTxt = await res.text();
    let message = `WordPress Page Creation Failed (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errTxt);
      if (errJson.message) message = errJson.message;
    } catch {}

    if (message.includes("OAuth credential is not accepted on the requested REST route") || res.status === 401 || res.status === 403) {
      throw new Error(
        `Novamira OAuth tokens are scoped by WordPress exclusively to Novamira MCP endpoints (/wp-json/mcp/novamira-oauth). To create pages directly via standard WordPress REST routes, please switch to the "Basic Auth (App Password)" tab in AI Converter or install the AI Converter Connector plugin.`
      );
    }
    throw new Error(message);
  }

  const page = await res.json();
  return {
    success: true,
    pageId: page.id,
    pageTitle: page.title?.rendered || pageTitle,
    pageSlug: page.slug,
    pageStatus: page.status,
    pageUrl: page.link,
    editUrl: `${origin}/wp-admin/post.php?post=${page.id}&action=elementor`,
    elementorSectionsCount: combinedData.length,
    via: "wp_bearer_rest",
  };
}
