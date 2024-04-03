import { NextResponse } from "next/server";
import create_connection from "../../../../backend/db/connection";
import { createProduct, delete_product, get_all_product, get_single_product, product_update } from "../../../../backend/controllers/product.controller";
import { v4 } from "uuid";
import path from "path"
import { writeFile } from "fs/promises";
import { authentication } from "../../../../backend/middilware/auth";
export async function POST(req, res) {
    try {
        console.log("create - product================>>>>>>>>>>>>>>>>>>");
        create_connection()
        const token = await req.cookies.get("token")?.value
        let payload = await req.formData()
        console.log(payload);
        const userid = await authentication(token)

        if (!userid?.user_id) {
            return new Response(JSON.stringify(userid), { status: 500 })
        }

        const images = [];
        for (const [key, value] of payload.entries()) {
            if (key === 'image') {
                images.push(value);
            }
        }
        console.log(images);
        if (!images.length){
            return new Response(JSON.stringify({msg:"Images Are Required"}), { status: 500 })
        }
        let allimages = []


        return Promise.all(images.map(async (it) => {
            let filename = `${v4() + path.extname(it.name)}`
            let byte = await it.arrayBuffer()
            const buffer = await Buffer.from(byte)
            let filepath = `./public/${filename}`
            await writeFile(filepath, buffer)
            allimages.push(filename)
            return filename
        })).then(async (result) => {
            console.log("result", result);
            let body = { token, name: payload.get("name"), description: payload.get("description"), price: payload.get("price"), categorys: payload.get("categorys"), stock: payload.get("stock"), discount: payload.get("discount"), delivery_charge: payload.get("delivery_charge"), image: result, user_id: userid?.user_id }
            return await createProduct(body)
        }).catch((error) => {
            console.log(error);
            return NextResponse.json({ status: true, msg: error.message })
        })

    } catch (error) {
        // console.log(error);
        return NextResponse.json({ status: true, msg: error.message })
    }
}

export async function PUT(req, res) {
    try {
        create_connection()
        const token = await req.cookies.get("token")?.value
        let payload = await req.formData()
        console.log(payload);
        const userid = await authentication(token)

        if (!userid?.user_id) {
            return new Response(JSON.stringify(userid), { status: 500 })
        }

        const images = [];
        for (const [key, value] of payload.entries()) {
            if (key === 'image') {
                images.push(value);
            }
        }
        console.log(images);
        let allimages = []


        return Promise.all(images.map(async (it) => {
            let filename = `${v4() + path.extname(it.name)}`
            let byte = await it.arrayBuffer()
            const buffer = await Buffer.from(byte)
            let filepath = `./public/${filename}`
            await writeFile(filepath, buffer)
            allimages.push(filename)
            return filename
        })).then(async (result) => {
            console.log("result", result);
            let body = { id: payload.get("id"), token, name: payload.get("name"), description: payload.get("description"), price: payload.get("price"), categorys: payload.get("categorys"), stock: payload.get("stock"), discount: payload.get("discount"), delivery_charge: payload.get("delivery_charge"), image: result, user_id: userid?.user_id }
            return await product_update(body)
        }).catch((error) => {
            console.log(error);
            return NextResponse.json({ status: true, msg: error.message })
        })

    } catch (error) {
        // console.log(error);
        return NextResponse.json({ status: true, msg: error.message })
    }
}

export async function DELETE(req, res) {
    try {
        create_connection()
        const token = await req.cookies.get("token")?.value
        let payload = new URL(req.url)?.searchParams
        console.log("payload",payload);
        const userid = await authentication(token)
        console.log("userid", userid);

        if (!userid?.user_id) {
            return new Response(JSON.stringify(userid), { status: 500 })
        }

        
        let body = { id: payload.get("id") }
        console.log("delete body", payload.get("id"));
        return await delete_product(body)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: true, msg: error.message })
    }
}

export async function GET(req, res) {
    try {
        create_connection()
        console.log("get=product=========>>>>>>>");
        const token = await req.cookies.get("token")?.value
        let payload = new URL(req.url)?.searchParams

        console.log(payload.get("page"));
        const userid = await authentication(token)

        if (!userid?.user_id) {
            return new Response(JSON.stringify(userid), { status: 500 })
        }
        let body = { page:payload.get("page"), limit :payload.get("limit"), rating:payload.get("rating"), search:payload.get("search"), from :payload.get("from"), end :payload.get("end") }
        return await get_all_product(body)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: true, msg: error.message })
    }
}

export async function PATCH(req, res) {
    try {
        create_connection()
        const token = await req.cookies.get("token")?.value
        let payload = await req.json()

        console.log(payload);
        const userid = await authentication(token)

        if (!userid?.user_id) {
            return new Response(JSON.stringify(userid), { status: 500 })
        }
        let body = { id:payload?.id }
        return await get_single_product(body)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: true, msg: error.message })
    }
}