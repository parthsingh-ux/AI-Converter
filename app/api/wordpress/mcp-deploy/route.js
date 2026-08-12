import { NextResponse } from "next/server";
import { deployViaMcpToken } from "@/lib/mcpClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      server_url,
      access_token,
      page_title,
      page_slug,
      page_status,
      templates,
    } = body;

    if (!server_url || !access_token) {
      return NextResponse.json(
        { success: false, error: "Novamira MCP Server URL and Access Token are required." },
        { status: 400 }
      );
    }

    if (!templates || (!templates.header && !templates.content && !templates.footer)) {
      return NextResponse.json(
        { success: false, error: "No Elementor template data provided for deployment." },
        { status: 400 }
      );
    }

    const deployResult = await deployViaMcpToken({
      siteUrl: server_url,
      accessToken: access_token,
      pageTitle: page_title || "AI Generated Elementor Page",
      pageSlug: page_slug || "",
      pageStatus: page_status || "publish",
      elementorTemplates: templates,
    });

    return NextResponse.json(deployResult);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to deploy page via Novamira MCP." },
      { status: 500 }
    );
  }
}
