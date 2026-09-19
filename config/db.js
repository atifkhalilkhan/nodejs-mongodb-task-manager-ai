import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
        const Connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${Connect.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default ConnectDB;