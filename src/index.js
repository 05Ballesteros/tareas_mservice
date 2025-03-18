import connectDB from "./config/db_connection.js";
import express from "express";
import morgan from "morgan";
import tareasRoutes from "./routes/v1/index.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { redisClient } from "./config/redis_connection.js";
import path from "path";
import { __dirname, __filename } from "./config/config.js";
import fs from "fs";
morgan.token("date", function () {
  return new Date().toISOString();
});
const tempDir = path.join(__dirname, "src", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
const format =
  "[:date] :method :url :status :response-time ms - :res[content-length]";
const app = express();
app.use(
  cors({
    origin: [
      `http://${process.env.APIGATEWAY_SERVICE_HOST}:${process.env.APIGATEWAY_SERVICE_PORT}`,
      "http://localhost:3000",
    ], //API Gateway
    //origin: "*",
    credentials: true,
  })
);
app.use(morgan(format));
app.use(express.json());
app.use(cookieParser());
//app.use("temp", express.static(path.join(__dirname, "temp")));
app.use(tareasRoutes);

connectDB();
redisClient.connect().then(() => {
  console.log("Redis connected");
  console.log(`Server running on port ${process.env.BACKEND_PORT}`);
  app.listen(process.env.BACKEND_PORT);
});
