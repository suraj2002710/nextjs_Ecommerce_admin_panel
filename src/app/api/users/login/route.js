import { NextResponse } from "next/server";
import create_connection from "../../../../../backend/db/connection";
import { login } from "../../../../../backend/controllers/users.controller";

export async function POST(req){
    try {
        create_connection()
        const payload=await req.json()
        console.log(payload);
        // let body=
        return await login(payload)
        
    } catch (error) {
        return NextResponse.json({ status: false, msg: error.message })
    }
}