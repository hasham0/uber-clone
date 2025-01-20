import asyncHandler from "../middlewares/async-handler.js";
import {
    getAddressCoordinates,
    getDistanceAndTime,
} from "../lib/services/map.service.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";
import { validationResult } from "express-validator";

const getCoordinates = asyncHandler(async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { address } = request.query;
    const coordinates = await getAddressCoordinates(address);
    if (!coordinates) {
        throw new CustomError("Co-ordinates not found", 400);
    }
    return response.status(200).json({
        data: coordinates,
    });
});
const getDistanceTime = asyncHandler(async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { origin, destination } = request.query;
    const distanceTime = await getDistanceAndTime(origin, destination);
    if (!distanceTime) {
        throw new CustomError("distance and time not found", 400);
    }
    return response.status(200).json({
        data: distanceTime,
    });
});

export { getCoordinates, getDistanceTime };
