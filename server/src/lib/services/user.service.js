import User from "../../models/user.model.js";

const createUser = async ({ firstname, lastname, email, password }) => {
    const checkValidation = [firstname, email, password].some(
        (item) => item.trim() === ""
    );
    if (checkValidation) {
        throw new Error("All fields are required");
    }
    return await User.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
};

export { createUser };
