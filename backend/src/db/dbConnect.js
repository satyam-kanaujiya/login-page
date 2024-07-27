import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect(){
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log("MongoDB Connection failed!");
        process.exit(1);
    }
}

export default dbConnect;