import { NextResponse } from "next/server";
const { Usermodle } = require("../model/user.model")
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { authentication } from "../middilware/auth";
export const create_user=async(body)=>{
    try {
        const {name,password,phone,email,image}=body
        const find_user=await Usermodle.findOne({email})
        if(find_user){
            return NextResponse.json({ status: false, msg:"user is already exits" })
        }
        let hashpwrd=await bcrypt.hash(password,10)
        const create_user=await Usermodle.create({
            name, password: hashpwrd, phone, email, image, user_type:"user"
        })
        if(create_user){
            let token=await jwt.sign({id:create_user._id},process.env.JWT_SECERET_KEY,{
                expiresIn:"1d"
            })
            
            const res = NextResponse.json({ status: true, msg: "signup successfully", token, data: create_user })
            res.cookies.set("token", token, {
                httpOnly: true
            })
            return res
        }
        return NextResponse.json({ status: false, msg: "user not sinup some error serivce down" })
    } catch (error) {
        return NextResponse.json({status:false,error:error.message,msg:"server error"})
    }
}

export const login=async(body)=>{
    try {
        const {password,email}=body
        const find_user=await Usermodle.findOne({email})
        console.log(find_user);
        if(!find_user){
            return new Response(JSON.stringify({ status: false, msg: "user not exits. please Regesitre." }),{status:401})
            // return NextResponse.json({ status: false, msg: "user not exits. please login." })
        }
        let compare_pwrd=await bcrypt.compare(password,find_user?.password)
        if(!compare_pwrd){
            return new Response(JSON.stringify({ status: false, msg: "password is wrong." }), { status: 401 })
            // return NextResponse.json({ status: false, msg: "password is wrong." })
        }
   
        let token = await jwt.sign({ id: find_user._id},process.env.JWT_SECERET_KEY,{
                expiresIn:"1d"
            })
            
        const res= NextResponse.json({ status: true, msg: "signup successfully", token, data: find_user })
        res.cookies.set("token",token,{
            httpOnly:true
        })
        return res
      
       
    } catch (error) {
        return NextResponse.json({ status: false, error, msg: "server error" }).status(401)
    }
}

export const get_profile = async (body) => {
    try {
        const {token}=body
        const userid = await authentication(token)
        console.log(userid);
        const find_user = await Usermodle.findOne({ _id: userid })
        if (!find_user) {
            return NextResponse.json({ status: false, msg: "user not exits. please login." })
        }
        return NextResponse.json({ status: true, data:find_user })


    } catch (error) {
        return NextResponse.json({ status: false, error, msg: "server error" })
    }
}
export const update_profile = async (body) => {
    try {
        const {name,email,phone,image}=body
        const { token } = body
        const userid = await authentication(token)
        if(!userid?.user_id){
            return new Response(JSON.stringify(userid),{status:500})
        }
      
        const find_user = await Usermodle.findOne({ _id:userid.user_id })
        if (!find_user) {
            return NextResponse.json({ status: false, msg: "user not exits. please login." })
        }
        const update_data = await Usermodle.updateOne({ _id: userid },{
            $set:{
                name, email, phone, image: image ? image : find_user?.image
            }
        })
            return NextResponse.json({ status: true, msg: "Profile Update Successfully" })


    } catch (error) {
        return NextResponse.json({ status: false, error, msg: "server error" })
    }
}