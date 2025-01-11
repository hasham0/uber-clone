import { ACCESS_TOKEN, cookieOptions } from "../constant.js";
import { createUser } from "../lib/services/user.service.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

const registerUser = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { fullname, email, password } = request.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new CustomError("User already registered", 400);
    }

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
    });

    // TODO: generate token from created user instance
    const token = await user.generateAuthToken();

    return response
        .status(201)
        .json({ data: user, token, message: "User registered" });
});

const loginUser = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }

    const { email, password } = request.body;

    const isUserExist = await User.findOne({ email }).select("+password");
    if (!isUserExist) {
        throw new CustomError("invalid email or password", 401);
    }

    const isPasswordMatch = await isUserExist.comparePassword(password);
    if (!isPasswordMatch) {
        throw new CustomError("invalid email or password", 401);
    }

    // TODO: generate token from created user instance
    const token = await isUserExist.generateAuthToken();

    return response
        .status(200)
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .json({ data: isUserExist, token });
});

const getUserProfile = asyncHandler(async (request, response) => {
    return response.status(200).json({
        data: request.user,
    });
});

const logoutUser = asyncHandler(async (request, response) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers.authorization.split(" ")[1];
    await BlacklistToken.create({ token });
    return response
        .status(200)
        .clearCookie(ACCESS_TOKEN)
        .json({ message: "logout user" });
});

export { registerUser, loginUser, getUserProfile, logoutUser };
