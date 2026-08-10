import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const downloadType = searchParams.get("type") === "json" ? "json" : "zip";

    if (!id) {
      return NextResponse.json({ error: "Missing download id." }, { status: 400 });
    }

    const outputDir = path.join(process.cwd(), "data", "outputs", id);
    const filename = downloadType === "json" ? "elementor-export.json" : "theme.zip";
    const filePath = path.join(outputDir, filename);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);

    const headers = new Headers();
    if (downloadType === "json") {
      headers.set("Content-Type", "application/json");
      headers.set("Content-Disposition", `attachment; filename="${id}-elementor.json"`);
    } else {
      headers.set("Content-Type", "application/zip");
      headers.set("Content-Disposition", `attachment; filename="${id}-theme.zip"`);
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error in /api/download handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
