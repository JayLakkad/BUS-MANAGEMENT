import { Driver } from "../models/driver.model.js";
import jwt from 'jsonwebtoken';

export const loginDriver = async(req,res)=>{
    const {email,password}=req.body;
    try {
        const driver = await Driver.findOne({email}).select("+password");
        if(!driver){
            return res.status(400).json({success:false,message:"Invalid credentials!"});
        }
        const isPasswordValid = await driver.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"Invalid credentials!"});
        }
        const token = driver.generateAuthToken();
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({
            success:true,
            token,
            message:"Driver logged in successfully",
            driver:{
                ...driver._doc,
                password:undefined,
            }
        });
    } catch (error) {
        console.log("Error in login Driver.",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const logoutDriver = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true,message:"Driver logged out successfully"});
};

export const getDriverProfile = async(req,res)=>{
    res.status(200).json({success:true,driver:req.driver});
};