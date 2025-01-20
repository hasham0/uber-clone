import asyncHandler from "../middlewares/async-handler.js";
import {
    addressCoordinates,
    autoSuggestions,
    distanceAndTime,
} from "../lib/services/map.service.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";
import { validationResult } from "express-validator";

const getCoordinates = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { address } = request.query;
    const coordinates = await addressCoordinates(address);
    if (!coordinates) {
        throw new CustomError("Co-ordinates not found", 400);
    }
    return response.status(200).json({
        data: coordinates,
    });
});
const getDistanceTime = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { origin, destination } = request.query;
    const distanceTime = await distanceAndTime(origin, destination);
    if (!distanceTime) {
        throw new CustomError("distance and time not found", 400);
    }
    return response.status(200).json({
        data: distanceTime,
    });
});

const getAutoSuggestions = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array(), 400);
    }
    const { input } = request.query;
    const suggestions = await autoSuggestions(input);
    if (!suggestions) {
        throw new CustomError("suggestions are not found", 400);
    }
    return response.status(200).json({
        data: suggestions,
    });
});
export { getCoordinates, getDistanceTime, getAutoSuggestions };
