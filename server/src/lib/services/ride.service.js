import Ride from "../../models/ride.model.js";
import calculateFare from "../utils/calculate-fare.js";
import generateOTP from "../utils/otp.js";

const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const fare = await calculateFare(pickup, destination);
    return await Ride.create({
        user,
        pickup,
        destination,
        otp: generateOTP(6),
        fare: fare[vehicleType],
    });
};

const vehicleTypeFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error("All fields are required");
    }
    return await calculateFare(pickup, destination);
};

export { createRide, vehicleTypeFare };
