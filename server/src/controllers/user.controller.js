import { createUser } from "../lib/services/user.service.js";
import asyncHandler from "../middlewares/async-handler.js";
import User, { userSchema } from "../models/user.model.js";
import { validationResult } from "express-validator";

const register = asyncHandler(async (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = request.body;

    const hashedPassord = await userSchema.static.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassord,
    });

    // TODO: generate token from created user instance
    const token = user.generateAuthToken();

    return response.status(201).json({ user, token });
});

export { register };
