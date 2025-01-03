import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "uberCloneProject",
        });
        return connect;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectToDB;
