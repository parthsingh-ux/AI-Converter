import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import app from "./src/app.js";
import connectToMongoDb from "./src/dbConfig/connectToDb.js";

dotenv.config({ path: [".env.local", ".env"] });

const PORT = process.env.PORT || 4000;

// SSL certificate paths
const sslOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/qa.adaanapps.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/qa.adaanapps.com/fullchain.pem"),
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 HTTPS Server running at https://localhost:${PORT}`);
  connectToMongoDb();
});
