import {User} from '../models/user.model.js';
import {Driver} from '../models/driver.model.js';
import {Admin} from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

export const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized access!"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        console.log("Error in authUser middleware.",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const authDriver = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized access!"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const driver = await Driver.findById(decoded._id);
        req.driver = driver;
        return next();
    } catch (error) {
        console.log("Error in authDriver middleware.",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const authAdmin = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized access!"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded._id);
        req.admin = admin;
        return next();
    }
    catch (error) {
        console.log("Error in authAdmin middleware.",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};