import { Router } from "express";
import { body } from "express-validator";
import {
    getCaptainProfile,
    loginCaptain,
    logoutCaptain,
    registerCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/register")
    .post(
        [
            body("email").isEmail().withMessage("Invalid email"),
            body("fullname.firstname")
                .isLength({ min: 3 })
                .withMessage("First name must be atlest 3 character long"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("Password must be atlest 6 character long"),
            body("vehicle.color")
                .isLength({ min: 3 })
                .withMessage("Color must be atlest 3 character long"),
            body("vehicle.plate")
                .isLength({ min: 5 })
                .withMessage("Plate must be atlest 5 character long"),
            body("vehicle.capacity")
                .isInt({ min: 1 })
                .withMessage("Capacity must be atlest 1"),
            body("vehicle.vehicleType")
                .isIn(["car", "motorcycle", "auto"])
                .withMessage("Invalid vehicle type"),
        ],
        registerCaptain
    );

router
    .route("/login")
    .post(
        [
            body("email").isEmail().withMessage("Invalid email"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("password must be atlest 6 character long"),
        ],
        loginCaptain
    );
router.route("/profile").get([authCaptain], getCaptainProfile);

router.route("/logout").get([authCaptain], logoutCaptain);

export default router;
