/**
 * WordPress REST API Integration Client
 * Handles basic auth, connection testing, and programmatic Elementor page creation
 */

export function normalizeWpUrl(siteUrl) {
  if (!siteUrl) return "";
  let url = siteUrl.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, "");
}

export function getAuthHeader(username, applicationPassword) {
  const cleanUsername = username?.trim() || "";
  // Application passwords may contain spaces (e.g. "abcd efgh ijkl mnop"), strip spaces if needed or keep raw
  const cleanPassword = applicationPassword?.replace(/\s+/g, "") || applicationPassword?.trim() || "";
  const credentials = `${cleanUsername}:${cleanPassword}`;
  return Buffer.from(credentials).toString("base64");
}

/**
 * Test connectivity and credentials with WordPress site via REST API
 */
export async function testWPConnection({ siteUrl, username, applicationPassword }) {
  const cleanUrl = normalizeWpUrl(siteUrl);
  if (!cleanUrl) throw new Error("WordPress Site URL is required.");
  if (!username || !applicationPassword) throw new Error("WordPress Username and Application Password are required.");

  const authHeader = getAuthHeader(username, applicationPassword);
  const endpoint = `${cleanUrl}/wp-json/wp/v2/users/me?context=edit`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${authHeader}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `WordPress Connection Failed (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson.message) message = errJson.message;
    } catch { }

    if (res.status === 401 || res.status === 403) {
      throw new Error(`Authentication Failed (${message}). Check your Username and Application Password.`);
    } else if (res.status === 404) {
      throw new Error(`WordPress REST API not found at ${cleanUrl}/wp-json/. Verify that WP REST API is enabled.`);
    }
    throw new Error(message);
  }

  const userData = await res.json();
  return {
    success: true,
    siteUrl: cleanUrl,
    userId: userData.id,
    userName: userData.name || userData.slug || username,
    roles: userData.roles || [],
  };
}

/**
 * Create or update a WordPress page with Elementor data attached to _elementor_data post meta
 */
export async function createOrUpdateElementorPage({
  siteUrl,
  username,
  applicationPassword,
  pageTitle,
  pageSlug,
  pageStatus = "publish",
  elementorTemplates = {},
}) {
  const cleanUrl = normalizeWpUrl(siteUrl);

  // Combine header, content, and footer templates
  const headerNodes = Array.isArray(elementorTemplates.header) ? elementorTemplates.header : [];
  const contentNodes = Array.isArray(elementorTemplates.content) ? elementorTemplates.content : [];
  const footerNodes = Array.isArray(elementorTemplates.footer) ? elementorTemplates.footer : [];

  const combinedData = [...headerNodes, ...contentNodes, ...footerNodes];
  const elementorJsonString = JSON.stringify(combinedData);

  // 1. Try AI Converter Connector Plugin route (/wp-json/ai-converter/v1/deploy) first
  try {
    const pluginRes = await fetch(`${cleanUrl}/wp-json/ai-converter/v1/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        deployment_id: `dep_${Date.now()}`,
        pages: [
          {
            title: pageTitle || "AI Generated Page",
            slug: pageSlug || "",
            status: pageStatus || "publish",
            elementor_data: combinedData,
          },
        ],
      }),
    });

    if (pluginRes.ok) {
      const pluginData = await pluginRes.json();
      if (pluginData.success && pluginData.pages?.items?.[0]) {
        const item = pluginData.pages.items[0];
        return {
          success: true,
          pageId: item.id,
          pageTitle: item.title,
          pageSlug: item.slug,
          pageStatus: pageStatus,
          pageUrl: item.url,
          editUrl: item.edit_url,
          elementorSectionsCount: combinedData.length,
          via: "ai_converter_plugin",
        };
      }
    }
  } catch (pluginErr) {
    console.warn("Plugin route attempt failed, falling back to Basic Auth:", pluginErr.message);
  }

  // 2. Fallback: Standard WP REST API with Basic Auth
  if (!username || !applicationPassword) {
    throw new Error("WordPress Username and Application Password are required if plugin is not active.");
  }

  const authHeader = getAuthHeader(username, applicationPassword);
  const endpoint = `${cleanUrl}/wp-json/wp/v2/pages`;

  const payload = {
    title: pageTitle || "AI Generated Page",
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
      "Authorization": `Basic ${authHeader}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `Failed to create WordPress page (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson.message) message = errJson.message;
    } catch { }
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
    editUrl: `${cleanUrl}/wp-admin/post.php?post=${page.id}&action=elementor`,
    elementorSectionsCount: combinedData.length,
  };
}
