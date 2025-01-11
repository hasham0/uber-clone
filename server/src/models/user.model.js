import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { model, models, Schema } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [3, "First name must be atleast 3 characters"],
            },
            lastname: {
                type: String,
                minlength: [3, "Last name must be atleast 3 characters"],
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
        socketId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, timestamp: Date.now() },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );
    return token;
};

const User = models.User || model("User", userSchema);
export default User;
