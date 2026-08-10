import { createReadStream } from "fs";
import { stat, writeFile, mkdir } from "fs/promises";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import os from "os";
import { parse as jsonToCsv } from "json2csv";
import path from "path";

export async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    createReadStream(filePath)
      .pipe(
        csvParser({
          separator: ",",
          quote: '"',
          escape: '"',
          strict: false,
          mapHeaders: ({ header }) => header?.trim() || "",
        })
      )
      .on("data", (row) => {
        const cleanRow = Object.fromEntries(
          Object.entries(row).filter(([key]) => key !== "")
        );
        results.push(cleanRow);
      })
      .on("end", () => resolve(results))
      .on("error", (err) =>
        reject(new Error("CSV parse error: " + err.message))
      );
  });
}

export async function parseExcel(filePath) {
  try {
    await stat(filePath);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet, {
      defval: "",
      raw: false,
    });
  } catch (err) {
    throw new Error("Excel parse error: " + err.message);
  }
}

export async function splitIntoCSVChunks(
  data,
  headers,
  batchSize,
  originalFilePath,
  baseName
) {
  const batchFiles = [];
  const dir = path.dirname(originalFilePath);
  const outputDir = path.join(dir, baseName);
  await mkdir(outputDir, { recursive: true });

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const csvString = jsonToCsv(batch, { fields: headers });
    const batchFilePath = path.join(
      outputDir,
      `${baseName}_batch_${Math.floor(i / batchSize) + 1}.csv`
    );
    await writeFile(batchFilePath, csvString + os.EOL);
    batchFiles.push(batchFilePath);
  }

  return { batchFiles, outputDir };
}
