import axios from "axios";
import { apis } from "../../../ApisEndpoint";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const get_product=createAsyncThunk("get_product",async(args,{rejectWithValue})=>{
    try {
        const {token,page,limit,from,end,rating}=args
        const headers={
            "Authorization":token
        }
        const { data } = await axios.get(`${apis.PRODUCT}?page=${page}&limit=${limit}&from=${from}&end=${end}&rating=${rating}`,headers)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})
export const create_product = createAsyncThunk("create_product",async(args,{rejectWithValue})=>{
    try {
        console.log("args", args);
        const { name, description, price, categorys, token,stock, discount, delivery_charge, image }=args
        const headers={
            "Authorization":token
        }

        const formdata=new FormData()
        formdata.set("name", name)
        formdata.set("description", description)
        formdata.set("price", price)
        formdata.set("categorys", categorys)
        formdata.set("stock", stock)
        formdata.set("discount", discount)
        formdata.set("delivery_charge", delivery_charge)
        Object.values(image)?.map((it)=>{
            console.log("it",it);
            formdata?.append("image", it)
        })
        
        console.log(formdata);
        const { data } = await axios.post(`${apis.PRODUCT}`, formdata, headers)
        console.log(data,"data");
        return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})


export const update_product = createAsyncThunk("update_product", async (args, { rejectWithValue }) => {
    try {
        console.log("args", args);
        const { name, id ,description, price, categorys, token, stock, discount, delivery_charge, image } = args
        const headers = {
            "Authorization": token
        }

        const formdata = new FormData()
        formdata.set("name", name)
        formdata.set("id", id)
        formdata.set("description", description)
        formdata.set("price", price)
        formdata.set("categorys", categorys)
        formdata.set("stock", stock)
        formdata.set("discount", discount)
        formdata.set("delivery_charge", delivery_charge)
        if (image){

            Object.values(image)?.map((it) => {
                console.log("it", it);
                formdata?.append("image", it)
            })
        }

        console.log(formdata);
        const { data } = await axios.put(`${apis.PRODUCT}`, formdata, headers)
        console.log(data, "data");
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})
export const get_category_list = createAsyncThunk("get_category_list", async (args, { rejectWithValue }) => {
    try {
        const { token } = args
        const headers = {
            "Authorization": token
        }
        const { data } = await axios.get(`${apis.CATEGORY_LIST}`, headers)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const get_single_product = createAsyncThunk("get_single_product", async (args, { rejectWithValue }) => {
    try {
        const { token, id } = args
        const headers = {
            "Authorization": token
        }
        const { data } = await axios.patch(`${apis.PRODUCT}`, {id:id},headers)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const delete_product = createAsyncThunk("delete_product", async (args, { rejectWithValue }) => {
    try {
        const { token, id } = args
        const headers = {
            "Authorization": token
        }
        const { data } = await axios.delete(`${apis.PRODUCT}?id=${id}`, headers)
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})
const product_slice=createSlice({
    initialState:{
        product:null,
        loading:null,
        status:null,
        error:null,
        category_list:null,
        single_product:null
    },
    name:"product",
    reducers:{
        status_blank:(state,action)=>{
            state.status=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(get_product.pending,(state,action)=>{
            state.loading="product-get"
        })
        builder.addCase(get_product.fulfilled,(state,action)=>{
            state.loading=null
            state.product=action.payload?.data
        })
        builder.addCase(get_product.rejected,(state,action)=>{
            state.loading=null
            state.error=action.payload?.response?.data?.msg
        })


        builder.addCase(create_product.pending,(state,action)=>{
            state.loading="product-create"
        })
        
        builder.addCase(create_product.fulfilled,(state,action)=>{
            state.loading=null
            state.product=action.payload,
            state.status="create"
        })
        builder.addCase(create_product.rejected,(state,action)=>{
            state.error=action.payload?.response?.data?.msg
        })


        builder.addCase(get_category_list.pending, (state, action) => {
        })
        builder.addCase(get_category_list.fulfilled, (state, action) => {
        
            state.category_list = action.payload?.data
        })
        builder.addCase(get_category_list.rejected, (state, action) => {
        })

        builder.addCase(get_single_product.pending, (state, action) => {
            state.loading="single-product"
        })
        builder.addCase(get_single_product.fulfilled, (state, action) => {
            state.loading = null
            state.single_product = action.payload?.data
        })
        builder.addCase(get_single_product.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })

        builder.addCase(update_product.pending, (state, action) => {
            state.loading="edit-product"
        })
        builder.addCase(update_product.fulfilled, (state, action) => {
            state.loading = null
            state.status="edit"
        })
        builder.addCase(update_product.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })

        builder.addCase(delete_product.pending, (state, action) => {
            state.loading="delete-product"
        })
        builder.addCase(delete_product.fulfilled, (state, action) => {
            state.loading = null
            state.status="delete"
        })
        builder.addCase(delete_product.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })
    }
})

export const Product_Action=product_slice.actions
const product_reducer=product_slice.reducer
export default product_reducer