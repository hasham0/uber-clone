// import and set dotenv config
import dotenv from "dotenv";
dotenv.config();

// import modules
import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

// import api routes
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

// import global level error handle middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

// set variable
const app = express();

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

// set global level error handling middlwere
app.use(errorMiddleware);

export default app;
