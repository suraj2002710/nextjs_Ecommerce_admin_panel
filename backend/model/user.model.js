import mongoose, { Schema } from 'mongoose'

const shcmea=new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    phone:Number,
    image:String,
    user_type:{
        enum:["user","admin"],
        type:String
    }
})

export const Usermodle = mongoose.models.users || new mongoose.model("users", shcmea)
 