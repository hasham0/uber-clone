import asyncHandler from "../middlewares/async-handler.js";
import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { ACCESS_TOKEN, cookieOptions } from "../constant.js";
import createCaptain from "../lib/services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";

const registerCaptain = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }

    const { fullname, email, password, vehicle } = request.body;

    const isCaptainExist = await Captain.findOne({ email });

    if (isCaptainExist) {
        throw new CustomError("Captain already registered", 400);
    }

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: Number(vehicle.capacity),
        vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateAuthToken();

    return response
        .status(201)
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .json({ message: "Captain registered" });
});

const loginCaptain = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }

    const { email, password } = request.body;

    const isCaptainExist = await Captain.findOne({ email }).select("+password");
    if (!isCaptainExist) {
        throw new CustomError("invalid email or password", 401);
    }

    const isPasswordMatch = await isCaptainExist.comparePassword(password);
    if (!isPasswordMatch) {
        throw new CustomError("invalid email or password", 401);
    }

    // TODO: generate token from created user instance
    const token = await isCaptainExist.generateAuthToken();

    return response
        .status(200)
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .json({ data: isCaptainExist, token });
});

const getCaptainProfile = asyncHandler(async (request, response) => {
    return response.status(200).json({
        data: request.captain,
    });
});

const logoutCaptain = asyncHandler(async (request, response) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers.authorization.split(" ")[1];
    await BlacklistToken.create({ token });
    return response
        .status(200)
        .clearCookie(ACCESS_TOKEN)
        .json({ message: "logout user" });
});
export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
