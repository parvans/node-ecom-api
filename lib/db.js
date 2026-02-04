import mongoose from "mongoose";


export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/ecom").then(()=>{
            console.log("MongoDB is Connected");
        });
    } catch (error) {
        console.log(error);
    }
}