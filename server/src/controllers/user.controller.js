import { ACCESS_TOKEN, cookieOptions } from "../constant.js";
import { createUser } from "../lib/services/user.service.js";
import asyncHandler from "../middlewares/async-handler.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import User, { userSchema } from "../models/user.model.js";
import { validationResult } from "express-validator";

const registerUser = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = request.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        return response
            .status(400)
            .json({ message: "User already registered" });
    }

    const hashedPassord = await userSchema.static.hashPassword(password);
    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassord,
    });

    // TODO: generate token from created user instance
    const token = await user.generateAuthToken();

    return response.status(201).json({ user, token });
});

const loginUser = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    const isUserExist = await User.findOne({ email }).select("+password");
    if (!isUserExist) {
        return response
            .status(401)
            .json({ message: "invalid email or password" });
    }
    const isPasswordMatch = await isUserExist.comparePassword(password);
    if (!isPasswordMatch) {
        return response
            .status(401)
            .json({ message: "invalid email or password" });
    }

    // TODO: generate token from created user instance
    const token = await isUserExist.generateAuthToken();

    return response
        .status(200)
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .json({ isUserExist, token });
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
