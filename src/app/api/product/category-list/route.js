import { get_all_category } from "../../../../../backend/controllers/product.controller";
import create_connection from "../../../../../backend/db/connection";
import { authentication } from "../../../../../backend/middilware/auth";

export async function GET(req){
    create_connection()
    const token = await req.cookies.get("token")?.value

    const userid = await authentication(token)

    if (!userid?.user_id) {
        return new Response(JSON.stringify(userid), { status: 500 })
    }
    return await get_all_category()
}