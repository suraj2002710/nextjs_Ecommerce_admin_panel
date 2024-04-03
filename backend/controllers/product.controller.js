const { NextResponse } = require("next/server")
const { productModel } = require("../model/product.model")
const { Categorymodle } = require("../model/category.model")

exports.createProduct = async (body) => {
    try {
        const { name, description, price, user_id,categorys, stock, discount, delivery_charge, image } = body
        const totalePrice = price 
        // console.log(totalePrice*discount/100)
        
        const discountPrice = totalePrice * discount / 100
        const payPrice = totalePrice - discountPrice
        // console.log(img)

        const add_new_product = await productModel.create({
            name,
            description,
            price: price,
            image,
            categorys,
            stock,
            discount_amount: discountPrice,
            discount,
            delivery_charge,
            user_id
        })
        if (add_new_product) {
            return NextResponse.json({ status: true, data: add_new_product, msg: "product create successfully" })
        }

    } catch (error) {
        // console.log(error);
        return NextResponse.json({ status: false, error: error.message, msg: "server error" })
    }
}

exports.get_single_product = async (body) => {
    try {
        const { id } = body
        console.log(id);
        const find = await productModel.findOne({ _id: id })
        if (!find) {
            return NextResponse.json({ status: false,msg:"product not found" , })
        } else {
            return NextResponse.json({ status: false, data: find })
        }
    } catch (error) {
        return NextResponse.json({ status: false, msg: error.message })
    }
}

exports.get_all_product = async (body) => {
    try {
        // const page = parseInt(req.query.page) || 1; 
        // const limit = parseInt(req.query.limit) || 10; 
        const { page, limit, rating, search, from, end } = body

        const skip = (page - 1) * limit;
        console.log(body, search && !from && end && !rating);

        console.log("search && !from && end && !rating",search && !from && end && !rating);
        let filterData = {}

        if (search && !from && !end && !rating) {
            console.log("rating", rating)
            filterData = {
                $or: [
                    { name: { "$regex": search, "$options": "i" } },
                    
                ]
            }
        }

        if (search && from && end) {
            console.log("search ==>", search, from, end)
            filterData = {
                $and: [
                    { name: { $regex: search, $options: "i" } },
                    { price: { $gte: from, $lte: end } }
                ]
            }
        }

        if (search && rating) {
            let rating1;
            let rating2;

            if (rating >= 1 && rating < 2) {
                rating1 = 1
                rating2 = 1.99
                console.log("1")
            }

            if (rating >= 2 && rating < 3) {
                rating1 = 2
                rating2 = 2.99
                console.log("2")
            }

            if (rating >= 3 && rating < 4) {
                rating1 = 3
                rating2 = 4.99
                console.log("3")
            }

            if (rating >= 4 && rating < 5) {
                rating1 = 4
                rating2 = 4.99
                console.log("4")
            }

            if (rating == 5) {
                rating1 = 5
                rating2 = 5
            }

            filterData = {
                $and: [
                    { name: { $regex: search, $options: "i" } },
                    { rating: { $gte: rating1, $lte: rating2 } }
                ]
            }
        }


        console.log("filterData", filterData, end, from)

        // const find = await productModel.find().skip(skip).limit(limit)
        const find = await productModel.find(filterData).skip(skip).limit(limit).sort("-createdAt")
        const count = await productModel.countDocuments(filterData)

        if (!find) {
            return NextResponse.json({ status: false, msg: "products not found" })
        } else {
        
               return NextResponse.json({ status: true, data: find, count,msg: "product not found" })
      
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, msg: error.message})
    }
}

exports.delete_product = async (body) => {
    try {
        const { id } = body
        const find = await productModel.findOne({ _id: id })
        console.log("find", find);
        if (!find) {
            return NextResponse.json({ status: true, data: find, msg: "product not found" })
        } else {
            
            await productModel.deleteOne({ _id: id })
            
             return NextResponse.json({ status: true, data: find, msg: "product delete successfully" })

        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, msg: error.message })
    }
}

exports.product_update = async (body) => {
    try {
        const {id,name, description, price, user_id,categorys, stock, discount, delivery_charge, image } = body
        const totalePrice = price 
        // console.log(totalePrice*discount/100)
        
        const discountPrice = totalePrice * discount / 100
        const payPrice = totalePrice - discountPrice
        const find = await productModel.findOne({ _id: id })
        
        const data = await productModel.updateOne({ _id: id }, { name: name, description: description, categorys, stock, discount, delivery_charge, user_id, price, image: image.length ? image:find.image })

            return NextResponse.json({ status: true, msg:"Successfully Update"})
        

        return NextResponse.json({ status: false, msg: "Product not found" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}

exports.get_all_category = async (body) => {
    try {
        const find_category = await Categorymodle.find()
        
        return NextResponse.json({ status: true, data: find_category })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}
exports.get_all_categorys = async (body) => {
    try {
        const {page,limit}=body
        const find_category = await Categorymodle.find()
        
        return NextResponse.json({ status: true, data: find_category })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}
exports.create_category = async (body) => {
    try {
        const {name}=body
        const find_cate=await Categorymodle.findOne({name})
        if(find_cate){
            return(new Response(
                JSON.stringify({msg:"This Name Category ALready exits."}),{
                    status:400
                }
            ))
        }
        const create_category = await Categorymodle.create({name})

        return NextResponse.json({ status: true, data: create_category })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}
exports.get_single_category = async (body) => {
    try {
        const {id}=body
        const find_category = await Categorymodle.findOne({_id:id})
        
        return NextResponse.json({ status: true, data: find_category })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}

exports.update_category = async (body) => {
    try {
        const { id,name } = body
        const find_cate = await Categorymodle.findOne({ name:name,_id:{
            $ne:id
        } })
        if (find_cate) {
            return (new Response(
                JSON.stringify({ msg: "This Name Category ALready exits." }), {
                status: 400
            }
            ))
        }

        await Categorymodle.updateOne({_id:id},{$set:{name}})
        return NextResponse.json({ status: true, msg:"Category Update Successfully" })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}
exports.delete_category = async (body) => {
    try {
        const { id } = body
        const find_category = await Categorymodle.findOne({ _id: id })
        if(find_category){
            await Categorymodle.deleteOne({_id:id})
            return NextResponse.json({ status: true,msg:"Category Delete Successfully" })
        }
        return (new Response(
            JSON.stringify({ msg: "This  Category not exits." }), {
            status: 400
        }
        ))

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: true, msg: error.message })
    }
}