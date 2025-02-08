import { Admin } from "../models/admin.model.js";
import {User} from '../models/user.model.js';
import {Driver} from '../models/driver.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser as createUserService } from "../services/user.service.js";
import { createDriver as createDriverService } from "../services/driver.service.js";

dotenv.config();
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password" });
        }
        if (email !== process.env.ADMIN_MAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            success: true,
            token,
            message: "Admin logged in successfully",
            admin: {
                email: process.env.ADMIN_MAIL,
            }
        });
    } catch (error) {
        console.error("Error in loginAdmin controller.", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export const logoutAdmin = async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({success:true,message:"Admin logged out successfully"});
};

export const getAdminProfile = async(req,res)=>{
    res.status(200).json({success:true,user:req.user});
};

export const createUser = async(req,res)=>{
    const {fullname,email,password,Stop}=req.body;
    try {
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false,message:"User already exists!"});
        }
        const hashedPassword = await User.hashPassword(password);
        const user  = await createUserService({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            Stop
        });
        const token = await user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({success:true, message:"User created successfully", user});
    } catch (error) {
        console.log("Error in creating user.", error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
};

export const createDriver = async(req,res)=>{
    const {fullname,email,password,bus} = req.body;
    try {
        const driverAlreadyExists = await Driver.findOne({email});
        if(driverAlreadyExists){
            return res.status(400).json({success:false,message:"Driver already exists!"});
        }
        const hashedPassword = await Driver.hashPassword(password);
        const driver = await createDriverService({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            plate: bus.plate
        });
        const token = await driver.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({success:true, message:"Driver created successfully", driver});
    }
    catch (error) {
        console.log("Error in creating driver.", error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
};