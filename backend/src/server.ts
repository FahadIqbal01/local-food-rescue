import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import allApiRouter from "./routes/allApisRouter";
import { ConnectDatabase } from "./database/databaseHandler";
import logger from "./middlewares/logger";

import "./jobs/AutoDeleteDonations";

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

const PORT: number = Number(process.env.PORT) | 3001;

app.use("/api", allApiRouter);

ConnectDatabase();

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
