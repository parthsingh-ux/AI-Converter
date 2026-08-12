import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/mcpClient";

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDesc = url.searchParams.get("error_description");

  if (error) {
    return new Response(
      `<html><body><h3>OAuth Authorization Error</h3><p>${error}: ${errorDesc || ""}</p><script>if(window.opener){window.opener.postMessage({type:'MCP_OAUTH_ERROR',error:'${error}'},'*');window.close();}</script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    return new Response(
      `<html><body><h3>Invalid Authorization Callback</h3><p>No authorization code received.</p></body></html>`,
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  try {
    const codeVerifier = req.cookies.get("mcp_code_verifier")?.value || url.searchParams.get("code_verifier");
    const tokenEndpoint = req.cookies.get("mcp_token_endpoint")?.value || url.searchParams.get("token_endpoint");
    const clientId = req.cookies.get("mcp_client_id")?.value || url.searchParams.get("client_id");
    const serverUrl = req.cookies.get("mcp_server_url")?.value || "";

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const redirectUri = `${protocol}://${host}/api/wordpress/mcp-auth/callback`;

    if (!tokenEndpoint) {
      throw new Error("Missing token endpoint from OAuth session.");
    }

    const tokenData = await exchangeCodeForToken({
      tokenEndpoint,
      code,
      codeVerifier,
      redirectUri,
      clientId,
    });

    const accessToken = tokenData.access_token;
    const tokenType = tokenData.token_type || "Bearer";

    // Return HTML page that closes popup and sends message to parent window
    const htmlResponse = `<!DOCTYPE html>
<html>
<head>
  <title>Novamira MCP Authorization Successful</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #021528; color: #fff; text-align: center; }
    .card { background: #010B14; border: 1px solid #148ECD; border-radius: 16px; padding: 32px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    h2 { color: #12A150; margin-top: 0; }
    p { color: #97A3AF; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>✓ Connected to Novamira MCP</h2>
    <p>Authorization complete! Closing window and completing setup in AI Converter...</p>
  </div>
  <script>
    const payload = {
      type: 'MCP_OAUTH_SUCCESS',
      accessToken: ${JSON.stringify(accessToken)},
      tokenType: ${JSON.stringify(tokenType)},
      serverUrl: ${JSON.stringify(serverUrl)},
    };
    try {
      localStorage.setItem('mcp_access_token', ${JSON.stringify(accessToken)});
      if (${JSON.stringify(serverUrl)}) {
        localStorage.setItem('mcp_server_url', ${JSON.stringify(serverUrl)});
      }
    } catch (e) {}

    if (window.opener) {
      window.opener.postMessage(payload, '*');
      setTimeout(() => window.close(), 1000);
    } else {
      window.location.href = '/?mcp_status=success';
    }
  </script>
</body>
</html>`;

    return new Response(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    return new Response(
      `<html><body style="font-family: sans-serif; padding: 40px; background: #021528; color: #fff;"><h2 style="color: #DB1439;">OAuth Token Exchange Failed</h2><p>${err.message}</p><script>if(window.opener){window.opener.postMessage({type:'MCP_OAUTH_ERROR',error:${JSON.stringify(err.message)}},'*');}</script></body></html>`,
      { headers: { "Content-Type": "text/html" }, status: 500 }
    );
  }
}
