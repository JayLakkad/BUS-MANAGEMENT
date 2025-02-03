import {Driver} from '../models/driver.model.js';

export const createDriver = async({firstname,lastname,email,password,plate})=>{
    if(!firstname || !lastname || !email || !password || !plate){
        throw new Error("Please fill in all fields");
    }
    const driver = Driver.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        bus:{
            plate
        }
    })
    return driver;
}