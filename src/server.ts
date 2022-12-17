import "dotenv/config"; // init to set .env vars into process.env;
import path from "path";
import cors from "cors";
import express from "express";
import { sendEmail } from "./app/jobs/send-mail";
import { config } from "./config/app";

const port = config.app.port;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

sendEmail(); // Sending emails every hour

// Server start
app.listen(port, () => {
  console.log(`-----------------------------------------------------------------------`);
  console.info(`\x1b[33mServer started at\x1b[0m http://localhost:${port}`);
  console.log(`-----------------------------------------------------------------------`);
});

