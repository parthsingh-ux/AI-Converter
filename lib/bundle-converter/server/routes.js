/**
 * Express REST API Routes
 */
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ConversionPipeline } from "../core/pipeline.js";

const upload = multer({ dest: path.join(process.cwd(), "uploads") });
export const router = express.Router();

const activeTasks = new Map();

export function setupRoutes(app, wsServer) {
  const pipeline = new ConversionPipeline();

  app.post("/api/convert", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const jobId = uuidv4();
      const inputPath = req.file.path;
      const originalName = req.file.originalname;

      // Handle zip extension preservation
      let targetInput = inputPath;
      if (originalName.endsWith(".zip")) {
        targetInput = `${inputPath}.zip`;
        fs.renameSync(inputPath, targetInput);
      } else if (originalName.endsWith(".html")) {
        targetInput = `${inputPath}.html`;
        fs.renameSync(inputPath, targetInput);
      }

      const outputDir = path.join(process.cwd(), "output", jobId);

      activeTasks.set(jobId, { status: "processing", progress: 0, step: "INIT" });

      res.json({ jobId, status: "processing", message: "Conversion task started" });

      // Run pipeline asynchronously
      pipeline.run(targetInput, outputDir, (progressEvent) => {
        activeTasks.set(jobId, { status: "processing", ...progressEvent });
        if (wsServer) {
          wsServer.broadcast({ jobId, ...progressEvent });
        }
      }).then(result => {
        activeTasks.set(jobId, { status: "completed", percent: 100, result });
        if (wsServer) {
          wsServer.broadcast({ jobId, status: "completed", percent: 100, result });
        }
      }).catch(err => {
        activeTasks.set(jobId, { status: "error", error: err.message });
        if (wsServer) {
          wsServer.broadcast({ jobId, status: "error", error: err.message });
        }
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/status/:jobId", (req, res) => {
    const task = activeTasks.get(req.params.jobId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  });

  app.get("/api/download/:jobId", (req, res) => {
    const zipPath = path.join(process.cwd(), "output", req.params.jobId, "complete-converted-site.zip");
    if (!fs.existsSync(zipPath)) {
      return res.status(404).json({ error: "Converted output file not found" });
    }
    res.download(zipPath, "complete-converted-site.zip");
  });
}
