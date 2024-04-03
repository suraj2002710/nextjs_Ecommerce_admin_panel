import axios from "axios";
import { apis } from "../../../ApisEndpoint";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const get_category = createAsyncThunk("get_category", async (args, { rejectWithValue }) => {
    try {
        const { token, page, limit } = args
        console.log(args,"args");
        const headers = {
            "Authorization": token
        }
        const { data } = await axios.get(`${apis.CATEGORY}?page=${page}&limit=${limit}`, headers)
        console.log(data,"data");
        return data
    } catch (error) {
        console.log(error,"error");
        return rejectWithValue(error)
    }
})
export const create_category = createAsyncThunk("create_category", async (args, { rejectWithValue }) => {
    try {
        console.log("args", args);
        const { name} = args
        

       
        const { data } = await axios.post(`${apis.CATEGORY}`, args)
        console.log(data, "data");
        return data
    } catch (error) {
        console.log(error);
       return rejectWithValue(error)
    }
})


export const update_category = createAsyncThunk("update_category", async (args, { rejectWithValue }) => {
    try {
        console.log("args", args);
        const { name ,id} = args
       

        const { data } = await axios.put(`${apis.CATEGORY}`, args)
        console.log(data, "data");
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})

export const get_single_category = createAsyncThunk("get_single_category", async (args, { rejectWithValue }) => {
    try {
        const { token, id } = args
        const headers = {
            "Authorization": token
        }
        console.log("args",args);
        const { data } = await axios.patch(`${apis.CATEGORY}`, args)
        console.log("singledata",data);
        return data
    } catch (error) {
        console.log(error,"error");
        return rejectWithValue(error)
    }
})

export const delete_category = createAsyncThunk("delete_category", async (args, { rejectWithValue }) => {
    try {
        const { token, id } = args
        const headers = {
            "Authorization": token
        }
        const { data } = await axios.delete(`${apis.CATEGORY}?id=${id}`, headers)
        return data
    } catch (error) {
       return rejectWithValue(error)
    }
})


const  category_slice=createSlice({
    name:"category",
    initialState:{
        category:null,
        loading: null,
        status: null,
        error: null,
        single_category: null
    },
    reducers: {
        status_blank: (state, action) => {
            state.status = null
        },
        single_category_blank:(state,action)=>{
            state.single_category=null

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(create_category.pending,(state,action)=>{
            state.loading="create_cate"
        })
        builder.addCase(create_category.fulfilled,(state,action)=>{
            state.loading=null
            state.status="create"
        })
        builder.addCase(create_category.rejected,(state,action)=>{
            state.loading=null
            state.error = action.payload?.response?.data?.msg
        })

        builder.addCase(get_category.pending, (state, action) => {
            state.loading = "get_cate"
        })
        builder.addCase(get_category.fulfilled, (state, action) => {
            state.loading = null
            state.category = action.payload?.data
        })
        builder.addCase(get_category.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })

        builder.addCase(delete_category.pending, (state, action) => {
            state.loading = "delete_cate"
        })
        builder.addCase(delete_category.fulfilled, (state, action) => {
            state.loading = null
            state.status = "delete_cate"
        })
        builder.addCase(delete_category.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })

        builder.addCase(get_single_category.pending, (state, action) => {
            state.loading = "get_single"
        })
        builder.addCase(get_single_category.fulfilled, (state, action) => {
            state.loading = null
            state.single_category=action.payload.data
        })
        builder.addCase(get_single_category.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })


        builder.addCase(update_category.pending, (state, action) => {
            state.loading = "edit"
        })
        builder.addCase(update_category.fulfilled, (state, action) => {
            state.loading = null
            state.single_category = action.payload.data
            state.status="edit"
        })
        builder.addCase(update_category.rejected, (state, action) => {
            state.loading = null
            state.error = action.payload?.response?.data?.msg
        })

    }
})

export const categoryAction = category_slice.actions
const category_reducer = category_slice.reducer
export default category_reducer