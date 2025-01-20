import { createRide } from "../lib/services/ride.service.js";
import { ValidationError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.js";
import { validationResult } from "express-validator";

const rideRequest = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const user = request.user;
    const { pickup, destination, vehicleType } = request.body;

    const ride = await createRide({
        user: user._id,
        pickup,
        destination,
        vehicleType,
    });

    return response.status(201).json({
        data: ride,
    });
});

export { rideRequest };
