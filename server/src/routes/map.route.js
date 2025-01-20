import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
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

export default router;
