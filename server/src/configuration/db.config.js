import mongoose from "mongoose";
import "dotenv/config";
import { DB_NAME } from "../constant.js";

const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: DB_NAME,
        });
        return connect;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectToDB;
