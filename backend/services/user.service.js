import { User } from "../models/user.model.js";

export const createUser = async({firstname,lastname,email,password})=>{
    if(!firstname || !lastname || !email || !password){
        throw new Error("Please fill in all fields");
    }
    const user = User.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}