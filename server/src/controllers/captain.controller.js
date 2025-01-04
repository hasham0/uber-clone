import asyncHandler from "../middlewares/async-handler.js";
import Captain, { captainSchema } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { ACCESS_TOKEN, cookieOptions } from "../constant.js";
import createCaptain from "../lib/services/captain.service.js";

const registerCaptain = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = request.body;

    const isCaptainExist = await Captain.findOne({ email });

    if (isCaptainExist) {
        return response
            .status(400)
            .json({ message: "Captain already registered" });
    }

    const hashedPassword = await captainSchema.static.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
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

export { registerCaptain };
