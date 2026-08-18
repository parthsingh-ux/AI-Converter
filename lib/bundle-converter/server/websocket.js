/**
 * WebSocket Progress Manager
 */
import { WebSocketServer } from "ws";

export class ProgressWebSocketServer {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Set();

    this.wss.on("connection", (ws) => {
      this.clients.add(ws);
      ws.on("close", () => this.clients.delete(ws));
    });
  }

  /**
   * Broadcasts progress event to all connected clients
   * @param {Object} event 
   */
  broadcast(event) {
    const payload = JSON.stringify(event);
    for (const client of this.clients) {
      if (client.readyState === 1) {
        client.send(payload);
      }
    }
  }
}
