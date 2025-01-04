import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.js";
import { ACCESS_TOKEN } from "../constant.js";
import BlacklistToken from "../models/blacklistToken.model.js";

const authUser = asyncHandler(async (request, response, next) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers?.authorization?.split(" ")[1];
    if (!token) {
        return response.status(401).json({ message: "Unauthorized" });
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });

    if (isTokenBlacklisted) {
        return response.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isUserExist = await User.findById({ _id: decoded._id });
        request.user = isUserExist;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Unauthorized" });
    }
});

export { authUser };
