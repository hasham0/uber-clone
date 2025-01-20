import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
    getAutoSuggestions,
    getCoordinates,
    getDistanceTime,
} from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = Router();

router
    .route("/get-coordinates")
    .get(
        [authUser, query("address").isString().isLength({ min: 3 })],
        getCoordinates
    );

router
    .route("/get-distance-time")
    .get(
        [
            authUser,
            query("origin").isString().isLength({ min: 3 }),
            query("destination").isString().isLength({ min: 3 }),
        ],
        getDistanceTime
    );

router
    .route("/get-suggestions")
    .get(
        [authUser, query("input").isString().isLength({ min: 3 })],
        getAutoSuggestions
    );
export default router;
