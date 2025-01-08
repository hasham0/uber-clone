import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.js";
import { ACCESS_TOKEN } from "../constant.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import Captain from "../models/captain.model.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";

const authUser = asyncHandler(async (request, response, next) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers?.authorization?.split(" ")[1];
    if (!token) {
        throw new CustomError("Unauthorized", 401);
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });

    if (isTokenBlacklisted) {
        throw new CustomError("Unauthorized", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isUserExist = await User.findById({ _id: decoded._id });
        if (!isUserExist) {
            throw new CustomError("Unauthorized", 401);
        }
        request.user = isUserExist;
        next();
    } catch (error) {
        next(error);
    }
});

const authCaptain = asyncHandler(async (request, response, next) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers?.authorization?.split(" ")[1];

    if (!token) {
        throw new CustomError("Unauthorized", 401);
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });

    if (isTokenBlacklisted) {
        throw new CustomError("Unauthorized", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CAPTAIN);
        const isCaptainExist = await Captain.findById({ _id: decoded._id });
        if (!isCaptainExist) {
            throw new CustomError("Unauthorized", 401);
        }
        request.captain = isCaptainExist;
        next();
    } catch (error) {
        next(error);
    }
});

export { authUser, authCaptain };
