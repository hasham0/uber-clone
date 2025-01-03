import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";

// set variable
const app = express();

// set dotenv config
dotenv.config();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.CROSS_ORIGIN,
        credentials: true,
    })
);

// routes
app.use("/api/user", userRoutes);

export default app;
