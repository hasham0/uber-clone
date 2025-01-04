import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [3, "First name must be atleast 3 characters long"],
            },
            lastname: {
                type: String,
                minlength: [3, "Last name must be atleast 3 characters long"],
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [5, "Email must be alteast 5 characters long"],
            matcher: [
                "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                "Invalid email format",
            ],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        soketId: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, "color must be atleast 3 characters long"],
            },
            plate: {
                type: String,
                required: true,
                minlength: [5, "plate must be atleast 3 characters long"],
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, "capicity must be atleast 1"],
            },
            vehicleType: {
                type: String,
                enum: ["motorcycle", "car", "auto"],
                required: true,
            },
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        },
    },
    {
        timestamps: true,
    }
);

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_CAPTAIN, {
        expiresIn: "24h",
    });
    return token;
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

captainSchema.static.hashPassword = async function (password) {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

const Captain = model["Captain"] || model("Captain", captainSchema);

export { captainSchema };
export default Captain;
