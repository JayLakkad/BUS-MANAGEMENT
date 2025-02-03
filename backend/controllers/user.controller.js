import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { generateTokenAndSetCookie } from '../utils/generateTokenandSetCookies.js';



export const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password" });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"Invalid credentials!"});
        }
        const isPasswordValid = user && await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"Invalid credentials!"});
        }
        const token = user && await user.generateAuthToken();
        res.cookie('token',token, { httpOnly: true });
        res.status(200).json({
            success:true,
            token,
            message:"User logged in successfully",
            user:{
                ...user?._doc,
                password:undefined,
            },
        });
        }
    catch (error) {
        console.log("Error in login User.",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const logoutUser = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true,message:"User logged out successfully"});
};


export const getUserProfile = async(req,res)=>{
    res.status(200).json({success:true,user:req.user});
};