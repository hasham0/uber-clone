import Ride from "../../models/ride.model.js";
import getFare from "../utils/calculate-fare.js";
import generateOTP from "../utils/otp.js";

const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);
    return await Ride.create({
        user,
        pickup,
        destination,
        otp: generateOTP(6),
        fare: fare[vehicleType],
    });
};

export { createRide };
