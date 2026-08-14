import { NextResponse } from "next/server";
import {
  saveSiteConnection,
  getSiteConnections,
  deleteSiteConnection,
} from "@/lib/dbService";

export async function GET() {
  try {
    const connections = await getSiteConnections();
    return NextResponse.json({ success: true, connections });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch site connections." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { site_url, name } = body;

    if (!site_url) {
      return NextResponse.json(
        { success: false, error: "WordPress site_url is required." },
        { status: 400 }
      );
    }

    const result = await saveSiteConnection({
      ...body,
      name: name || site_url,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save site connection." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Connection id is required." },
        { status: 400 }
      );
    }

    const result = await deleteSiteConnection(id);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete site connection." },
      { status: 500 }
    );
  }
}
