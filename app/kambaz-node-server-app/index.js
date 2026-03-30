import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "../labs/lab5/index.js";
import Kambaz from "./Kambaz/index.js";

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz-secret-key",
    resave: false,
    saveUninitialized: false,
  }),
);

Hello(app);
Lab5(app);
Kambaz(app);

app.listen(process.env.PORT || 4000);
