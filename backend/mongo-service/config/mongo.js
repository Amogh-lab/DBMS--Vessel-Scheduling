import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongodb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to MeowDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}