import { Schema, model } from "mongoose";

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    },
});

const BlacklistToken =
    model.BlacklistToken || model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;
