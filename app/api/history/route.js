import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getConversions } from "@/lib/dbService";

export async function GET() {
  try {
    // 1. Primary: Fetch converted themes from MongoDB
    let mongoConversions = [];
    try {
      mongoConversions = await getConversions(100);
    } catch (dbErr) {
      console.warn("MongoDB History fetch warning:", dbErr.message);
    }

    // 2. Secondary: Fallback to local /data/outputs directory
    const outputsDir = path.join(process.cwd(), "data", "outputs");
    const localHistory = [];

    try {
      await fs.access(outputsDir);
      const entries = await fs.readdir(outputsDir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const metaPath = path.join(outputsDir, entry.name, "meta.json");
          try {
            const metaContent = await fs.readFile(metaPath, "utf-8");
            const metaData = JSON.parse(metaContent);
            localHistory.push(metaData);
          } catch {
            // Ignore invalid folder
          }
        }
      }
    } catch {
      // Local outputs dir doesn't exist
    }

    // Merge MongoDB and Local history without duplicates
    const combinedMap = new Map();
    [...mongoConversions, ...localHistory].forEach((item) => {
      if (item && (item.id || item.title)) {
        const key = item.id || item.title;
        if (!combinedMap.has(key)) {
          combinedMap.set(key, item);
        }
      }
    });

    const combinedList = Array.from(combinedMap.values());
    combinedList.sort((a, b) => (b.timestamp || b.createdAt || 0) - (a.timestamp || a.createdAt || 0));

    return NextResponse.json({
      success: true,
      conversions: combinedList,
      history: combinedList,
    });
  } catch (error) {
    console.error("Error in /api/history handler:", error);
    return NextResponse.json(
      { success: false, errors: [error.message] },
      { status: 500 }
    );
  }
}
