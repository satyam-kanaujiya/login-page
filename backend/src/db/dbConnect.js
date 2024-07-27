import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect(){
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        
        // //connecting to localhost
        // const response = await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
        console.log(`host:${response.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection failed!");
        process.exit(1);
    }
}

export default dbConnect;