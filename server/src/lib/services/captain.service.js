import Captain from "../../models/captain.model.js";

const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    const checkValidation = [
        firstname,
        email,
        password,
        color,
        plate,
        capacity,
        vehicleType,
    ].some((item) =>
        typeof item === "String" ? item.trim() === "" : Number.isNaN(item)
    );

    if (checkValidation) {
        throw new Error("All fields are required");
    }

    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });
    return captain;
};

export default createCaptain;
