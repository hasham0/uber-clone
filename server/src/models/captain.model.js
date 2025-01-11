import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { model, models, Schema } = mongoose;

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

captainSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

captainSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, timestamps: Date.now() },
        process.env.JWT_SECRET_CAPTAIN,
        {
            expiresIn: "24h",
        }
    );
    return token;
};

const Captain = models.Captain || model("Captain", captainSchema);

export default Captain;
