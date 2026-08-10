import express from "express";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import authRoutes from "./routes/loginRoute.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api/images", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/auth", authRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!", false));
});

app.use((err, req, res, next) => {
  let {
    status = 500,
    message = "Internal server issue",
    success = false,
  } = err;
  res.status(status).send({ message, success });
});

export default app;
