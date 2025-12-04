import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello mohammed");
  console.log("hello mohammed");
});

app.listen(process.env.PORT || 8000);
