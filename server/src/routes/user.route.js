import { Router } from "express";
import { body } from "express-validator";
import { register } from "../controllers/user.controller.js";

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
        register
    );

export default router;
