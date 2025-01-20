import crypto from "crypto";

const generateOTP = (length) => {
    if (length <= 0 || length > 20) {
        throw new Error("Length must be a positive integer between 1 and 20.");
    }

    const min = Math.pow(10, length - 1); // Smallest number with the desired length
    const max = Math.pow(10, length) - 1; // Largest number with the desired length

    const otp = crypto.randomInt(min, max + 1).toString(); // Generate random OTP
    return otp;
};

export default generateOTP;
