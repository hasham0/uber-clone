import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

userSchema.static.hashPassword = async function (password) {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

const User = model["User"] || model("User", userSchema);
export { userSchema };
export default User;
// require("node:crypto").randomBytes(24).toString("hex");
