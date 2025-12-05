import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { initsocket } from "./socket/socket.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);
// console.log(sequelize.sync());
const server = http.createServer(app);

const io = initsocket(server);

console.log(process.env.CLIENT_URL);
app.get("/", (req, res) => {
  res.send("dlkfj");
});
sequelize.sync().then(() => console.log("Database sssynced"));
server.listen(process.env.PORT || 8000);
