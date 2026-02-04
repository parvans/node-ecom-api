import express from "express";
import { config } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import purchaseRoute from "./routes/purchase.routes.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
connectDB()

app.get('/',(req, res)=>{
    res.json({message:"Server is running..."})
});

app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/purchase", purchaseRoute)

app.listen(PORT,()=>{
    console.log("Server is running...");
});