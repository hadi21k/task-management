import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./src/utils/connect.js";

dotenv.config();

import authRoute from "./src/routes/authRoute.js";
import workspaceRoute from "./src/routes/workspaceRoute.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/workspaces", authMiddleware, workspaceRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server is running on port " + PORT);
});
