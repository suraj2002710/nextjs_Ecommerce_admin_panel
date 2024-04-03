import create_connection from "../../../../backend/db/connection";
import { authentication } from "../../../../backend/middilware/auth";

const { get_all_category, create_category, update_category, get_single_category, delete_category, get_all_categorys } = require("../../../../backend/controllers/product.controller");

export async function GET(req){
    create_connection()
    const token = await req.cookies.get("token")?.value
    let payload = new URL(req.url)?.searchParams
    console.log(payload);
    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    let body = { page: payload.get("page"), limit: payload.get("limit"), }
    return await get_all_categorys(body)
}
export async function POST(req){
    create_connection()
    const token = await req.cookies.get("token")?.value
    let payload = await req.json()
    console.log(payload);
    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    let body = { name: payload.name}
    return await create_category(body)
}
export async function PUT(req){
    create_connection()
    const token = await req.cookies.get("token")?.value
    let payload = await req.json()
    console.log(payload);
    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    let body = {id:payload.id, name: payload.name }
    return await update_category()
}
export async function PATCH(req){
    create_connection()
    const token = await req.cookies.get("token")?.value
    let payload = await req.json()
    console.log(payload);
    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    let body = { id: payload.id }
    return await get_single_category(body)
}
export async function DELETE(req){
    create_connection()
    const token = await req.cookies.get("token")?.value
    let payload = new URL(req.url)?.searchParams
    console.log(payload);
    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    let body = { id: payload.get("id") }
    return await delete_category(body)
}