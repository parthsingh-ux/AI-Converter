import { NextResponse } from "next/server";
import { buildOAuthAuthorizeUrl } from "@/lib/mcpClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { server_url, connector_name } = body;

    if (!server_url) {
      return NextResponse.json(
        { success: false, error: "MCP Server URL is required." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const redirectUri = `${protocol}://${host}/api/wordpress/mcp-auth/callback`;

    const state = Math.random().toString(36).substring(2, 15);

    const authData = await buildOAuthAuthorizeUrl({
      serverUrl: server_url,
      redirectUri,
      state,
      clientName: connector_name || "novamira-mcp-adaantest3-c",
    });

    const response = NextResponse.json({
      success: true,
      authorizeUrl: authData.authorizeUrl,
      state,
      codeVerifier: authData.codeVerifier,
      tokenEndpoint: authData.tokenEndpoint,
      origin: authData.origin,
      clientId: authData.clientId,
    });

    // Store verifier, token endpoint, client ID in HTTP cookies for callback
    response.cookies.set("mcp_code_verifier", authData.codeVerifier, { httpOnly: true, path: "/", maxAge: 600 });
    response.cookies.set("mcp_token_endpoint", authData.tokenEndpoint, { httpOnly: true, path: "/", maxAge: 600 });
    response.cookies.set("mcp_client_id", authData.clientId, { httpOnly: true, path: "/", maxAge: 600 });
    response.cookies.set("mcp_server_url", server_url, { httpOnly: true, path: "/", maxAge: 3600 });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to initiate OAuth authorization." },
      { status: 500 }
    );
  }
}
