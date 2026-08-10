import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const outputsDir = path.join(process.cwd(), "data", "outputs");

    try {
      await fs.access(outputsDir);
    } catch {
      // Directory doesn't exist yet
      return NextResponse.json({ success: true, history: [] });
    }

    const entries = await fs.readdir(outputsDir, { withFileTypes: true });
    const history = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const metaPath = path.join(outputsDir, entry.name, "meta.json");
        try {
          const metaContent = await fs.readFile(metaPath, "utf-8");
          const metaData = JSON.parse(metaContent);
          history.push(metaData);
        } catch {
          // Ignore invalid or unreadable folders
        }
      }
    }

    // Sort newest first
    history.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error in /api/history handler:", error);
    return NextResponse.json(
      { success: false, errors: [error.message] },
      { status: 500 }
    );
  }
}
