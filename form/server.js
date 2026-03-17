import pg from "pg";
import express from "express";
import fs from "fs/promises";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());
app.get("/", async (req, res) => {
  const html = await fs.readFile("./index.html");
  res.status(200);
  res.setHeader("Content-type", "text/html");
  res.send(html);
});
app.get("/index.js", async (req, res) => {
  const js = await fs.readFile("./index.js");
  res.status(200);
  res.setHeader("Content-type", "text/javascript");
  res.send(js);
});
app.post("/adduser", async (req, res) => {
  try {
    const { email, password, checked } = req.body;
    await pool.query(
      `
  INSERT INTO 
   users
  (email, password, checked)
  VALUES 
  ($1, $2, $3)`,
      [email, password, checked],
    );
    res.status(201).json({ message: "user added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});
app.listen(3000);
