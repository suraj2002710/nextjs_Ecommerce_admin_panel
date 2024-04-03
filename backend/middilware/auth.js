import { NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken"
import { Usermodle } from "../model/user.model";
export const authentication= async(token)=>{
    try {
        console.log("authentication", token);
        if(!token){
            return { status: false, msg: "token not found" }
        }
        console.log("decode", process.env.JWT_SECERET_KEY);
        const decode = await Jwt.verify(token, process.env.JWT_SECERET_KEY)
        console.log(decode);
        if(decode?.id){
            const find_user=await Usermodle.findOne({_id:decode.id})
            if(find_user){
                
                return {user_id:find_user._id}
            }
            return { status: false, msg: "user not found" }
        }
    } catch (error) {
        console.log(error);
        return {status:false,msg:error.message}
    }
}