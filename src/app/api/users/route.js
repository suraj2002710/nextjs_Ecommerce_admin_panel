import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import { create_user, get_profile, update_profile } from "../../../../backend/controllers/users.controller";
import create_connection from "../../../../backend/db/connection";
import path from "path"
import {v4} from "uuid"
export  async function POST(req){
    try {
        create_connection()
        const payload=await req.formData()
        let file=payload.get("image")
        let filename
        if (file) {

            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            filename = v4() + path.extname(file.name)
            let filepath = `./public/${filename}`
            await writeFile(filepath, buffer)
        }
        console.log(payload);  
        let body = { name: payload.get("name"), email: payload.get("email"), password: payload.get("password"), image: filename, phone: payload.get("phone") }
       return await create_user(body)

    } catch (error) {
        return NextResponse.json({status:false,msg:"server error"})
    }
}

export async function GET(req) {
    try {
        create_connection()
        const payload=await req.cookies.get("token").value
        console.log(payload);
   
        let body = { token: payload }
        return await get_profile(body)

    } catch (error) {
        return NextResponse.json({ status: false, msg: "server error" })
    }
}

export async function PUT(req) {
    try {
        create_connection()
        const payload = await req.formData()
        let file = payload.get("image")
        const token = await req.cookies.get("token").value
        console.log(payload);
        let filename
        if(file){

            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            filename = v4() + path.extname(file.name)
            let filepath = `./upload/${filename}`
            await writeFile(filepath, buffer)
        }

        let body = { token: payload, name: payload.get("name"), email: payload.get("email"),image: filename, phone: payload.get("phone"),token }
        return await update_profile(body)

    } catch (error) {
        return NextResponse.json({ status: false, msg: "server error" })
    }
}