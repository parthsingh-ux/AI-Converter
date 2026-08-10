import { NextResponse } from "next/server";
import { testWPConnection } from "@/lib/wordpressClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { site_url, username, application_password } = body;

    if (!site_url || !username || !application_password) {
      return NextResponse.json(
        { success: false, error: "WordPress site_url, username, and application_password are required." },
        { status: 400 }
      );
    }

    const conn = await testWPConnection({
      siteUrl: site_url,
      username,
      applicationPassword: application_password,
    });

    return NextResponse.json(conn);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to connect to WordPress site." },
      { status: 500 }
    );
  }
}
