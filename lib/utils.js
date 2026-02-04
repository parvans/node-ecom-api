import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();
export const generateToken = async(userId, res)=>{
    try {
        const {JWT_SECRET} = process.env;
        if(!JWT_SECRET) return res.status(401).json({message:"Not authorized - secret not provided"});

        const token = jwt.sign({userId},JWT_SECRET,{
            expiresIn:"7d"
        });

        res.cookie('jwt',token,{
            httpAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        });

        return token
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}