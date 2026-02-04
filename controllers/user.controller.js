import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcrypt"
export const createUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({message:"All fields required"});

        const existuser = await User.findOne({email:email}).select('-password')
        if(!existuser) return res.status(400).json({message:"User is already exist"});

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password:hashpassword});
        await newUser.save();

        return res.status(201).json({message:"User Created"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


export const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message:"All fields required"});

        const existUser = await User.findOne({email,password});
        if(!existUser) return res.status(400).json({message:"User Not Found"});

        const isMatch = await bcrypt.compare(password, existUser.password)
        if(!isMatch) return res.status(400).json({message:"invalid User credentials"});

        generateToken(existUser._id, res);
        return res.status(200).json({success:true, message:`Welcome ${existUser.name}`})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

export const getUser = async(req, res)=>{
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({message:"User id is required"});

        const getUser = await User.findById(id).select("-password");
        if(!getUser) return res.status(400).json({message:"User not found"});

        return res.status(200).json({message:"User found", user:getUser})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

}
export const getUsers = async(req, res)=>{
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({message:"Users found", users:users})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

}
export const updateUser = async(req, res)=>{
    try {
        const {name,email} = req.body
        const id = req.params.id
        if(!name || !email) return res.status(400).json({message:"name and email fields required"});
        if(!id) return res.status(400).json({message:"User id is required"});

        const getUser = await User.findById(id).select("-password");
        if(!getUser) return res.status(400).json({message:"User not found"});

        await User.findByIdAndUpdate(id, {name,email}, {new:true});
        return res.status(200).json({message:"User details updated"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
export const deleteUser = async(req, res)=>{
    try {
        const id = req.query.id;
        if(!id) return res.status(400).json({message:"User id is required"});

        const getUser = await User.findById(id).select("-password");
        if(!getUser) return res.status(400).json({message:"User not found"});

        await User.findByIdAndDelete(id);
        return res.status(200).json({message:"User Deleted"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}