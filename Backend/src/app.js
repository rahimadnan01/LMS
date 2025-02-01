import express from "express";
import path from "path";
import cors from "cors";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set(express.static("public"));
export { app };
