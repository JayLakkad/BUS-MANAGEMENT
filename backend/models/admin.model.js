import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
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

});

adminSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'30d'});
    return token;
}
adminSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);  
}

adminSchema.statics.hashedPassword = async function(password){
    return await bcrypt.hash(password,10);
}

export const Admin = mongoose.model("Admin",adminSchema);