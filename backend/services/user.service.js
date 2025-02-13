import { User } from "../models/user.model.js";

export const createUser = async({firstname,lastname,email,password,Stop})=>{
    if(!firstname || !lastname || !email || !password || !Stop){
        throw new Error("Please fill in all fields");
    }
    const user = User.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        Stop
    })
    return user;
}