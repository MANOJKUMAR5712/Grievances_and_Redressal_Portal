import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const MongoURI = process.env.MONGO_URI;
        if(!MongoURI) throw new error("Required String");
        const conn = await mongoose.connect(MongoURI);
        console.log(`MongoDB connected at : ${conn.connection.host} : ${conn.connection.name}`); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}