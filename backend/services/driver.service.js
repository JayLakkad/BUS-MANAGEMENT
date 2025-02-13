import {Driver} from '../models/driver.model.js';

export const createDriver = async({firstname,lastname,email,password,plate,route})=>{
    if(!firstname || !lastname || !email || !password || !plate || !route){
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
        },
        route
    })
    return driver;
}