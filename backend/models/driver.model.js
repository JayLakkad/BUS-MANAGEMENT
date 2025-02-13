import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const driverSchema = new mongoose.Schema({
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
    },
    bus:{
        plate:{
            type:String,
            required:true,
        }
    },
    route:{
        type:String,
        required:true,
    },

})
driverSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    return token;
}

driverSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

driverSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

export const Driver = mongoose.model("Driver",driverSchema);