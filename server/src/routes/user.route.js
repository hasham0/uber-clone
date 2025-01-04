import { Router } from "express";
import { body } from "express-validator";
import {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/register")
    .post(
        [
            body("email").isEmail().withMessage("Invalid email"),
            body("fullname.firstname")
                .isLength({ min: 3 })
                .withMessage("first name must be atlest 3 character long"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("password must be atlest 6 character long"),
        ],
        registerUser
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
        loginUser
    );

router.route("/profile").get([authUser], getUserProfile);

router.route("/logout").get([authUser], logoutUser);
export default router;
