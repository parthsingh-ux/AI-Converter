/**
 * Express & WebSocket Server Entry Point
 */
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import { setupRoutes } from "./routes.js";
import { ProgressWebSocketServer } from "./websocket.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Serve static frontend Dashboard UI
const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));
app.use("/output", express.static(path.join(process.cwd(), "output")));

// Initialize WebSocket server
const wsServer = new ProgressWebSocketServer(server);

// Setup API routes
setupRoutes(app, wsServer);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 Universal Website Bundle Converter Server running at http://localhost:${PORT}`);
  console.log(`📊 Web Dashboard available at: http://localhost:${PORT}/\n`);
});
