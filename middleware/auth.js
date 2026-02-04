import jwt from "jsonwebtoken"
import { config } from "dotenv";
import User from "../models/user.js";
config();
export const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookie.jwt;
        if(!token) return res.status(401).json({message:"Not Auth - token not exist"});

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode) return res.status(401).json({message:"Not Auth - invalid token"});

        const user = await User.findById(decode.userId).select('-password');
        if(!user) return res.status(401).json({message:"Not Auth - User Not found"});

        req.user = user
        next()
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}