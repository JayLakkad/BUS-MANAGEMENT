import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    }

})
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    return token;
}

userSchema.methods.comparePassword=async function(password){
    const user = await this.model('User').findById(this._id).select('+password');
    return await bcrypt.compare(password, user.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

export const User= mongoose.model('User',userSchema);
