import mongoose from 'mongoose'

const schema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, ' Product name is required'],
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'description is required'],
    },
    price:{
        type:Number
    },
    rating:{
        type:Number,
        default:0,
    },
    numberofreviews:{
        type:Number,
        default:0,
    },
    image:{
        type:Array,
        required:[true,'"product image are required']
    },
    stock: {
        type: Number,
        default: 0
    },

    categorys:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:[true,'CategoryId is required']
    },
    size:{
        type:String,
    },
    discount:{
        type:Number
    },
    discount_amount:{
        type:Number
    },
    delivery_charge:{
        type:Number,
        default:0,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

 
},{timestamps:true})



export const productModel = mongoose.models.products || mongoose.model("products", schema)
