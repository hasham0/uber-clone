import mongoose, { Schema, model } from "mongoose";

const rideSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain",
        },
        pickup: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        fare: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "ongoing", "completed", "cancel"],
            default: "pending",
        },
        duration: {
            type: Number, // in seconds
        },
        distance: {
            type: Number, // in meters
        },
        paymentID: {
            type: String,
        },
        orderID: {
            type: String,
        },
        signature: {
            type: String,
        },
        otp: {
            type: String,
            select: false,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Ride = model.Ride || model("Ride", rideSchema);

export default Ride;
