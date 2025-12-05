import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { initsocket } from "./socket/socket.js";

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = initsocket(server);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("dlkfj");
});

server.listen(process.env.PORT || 8000);
