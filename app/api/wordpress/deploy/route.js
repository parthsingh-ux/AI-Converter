import { NextResponse } from "next/server";
import { createOrUpdateElementorPage } from "@/lib/wordpressClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      site_url,
      username,
      application_password,
      page_title,
      page_slug,
      page_status,
      templates,
    } = body;

    if (!site_url || !username || !application_password) {
      return NextResponse.json(
        { success: false, error: "WordPress site_url, username, and application_password are required." },
        { status: 400 }
      );
    }

    if (!templates || (!templates.header && !templates.content && !templates.footer)) {
      return NextResponse.json(
        { success: false, error: "No Elementor template data provided for deployment." },
        { status: 400 }
      );
    }

    const deployResult = await createOrUpdateElementorPage({
      siteUrl: site_url,
      username,
      applicationPassword: application_password,
      pageTitle: page_title || "AI Generated Elementor Page",
      pageSlug: page_slug || "",
      pageStatus: page_status || "publish",
      elementorTemplates: templates,
    });

    return NextResponse.json(deployResult);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to deploy page to WordPress site." },
      { status: 500 }
    );
  }
}
