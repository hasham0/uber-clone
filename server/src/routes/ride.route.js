import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import { rideRequest } from "../controllers/ride.controller.js";

const router = Router();

router
    .route("/crate-ride")
    .post(
        [
            authUser,
            body("pickup")
                .isString()
                .isLength({ min: 3 })
                .withMessage("Invalid pickup address"),
            body("destination")
                .isString()
                .isLength({ min: 3 })
                .withMessage("Invalid destination address"),
            body("vehicleType")
                .isIn(["car", "motorcycle", "auto"])
                .withMessage("Invalid vehicle type"),
        ],
        rideRequest
    );

export default router;
