import dotenv from "dotenv";
dotenv.config();
import express from "express";

import allApiRouter from "./routes/allApisRouter";
import { ConnectDatabase } from "./database/databaseHandler";

const app = express();

app.use(express.json());

const PORT: number = Number(process.env.PORT) | 3001;

app.use("/api", allApiRouter);

ConnectDatabase();

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
