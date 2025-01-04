import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// import api routes
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

// set variable
const app = express();

// set dotenv config
dotenv.config();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CROSS_ORIGIN,
        credentials: true,
    })
);

// set routes
app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);

export default app;
