import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is missing in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    } catch (error) {
        console.error("database connection error:", error.message)
        process.exit(1)
    }
}

export default connectDb;


