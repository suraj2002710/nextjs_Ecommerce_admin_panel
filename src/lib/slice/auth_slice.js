const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const { apis } = require("../../../ApisEndpoint");
export const auth_login=createAsyncThunk("login",async(args,{rejectWithValue})=>{
    try {
        const data=await axios.post(`${apis.LOGIN}`,args)
        console.log("data",data);
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})


const auth_slice=createSlice({
    initialState:{
        user:null,
        error:null,
        loading:null,
        status:false,
    },
    name:"auth",
    reducers:{
        login_error_blank:(state,action)=>{
            console.log(state.error);
            state.error=null
        },
        login_status_blank: (state, action) => {
            
            state.status = false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(auth_login.pending,(state,action)=>{
            state.loading="login"
        })
        builder.addCase(auth_login.fulfilled,(state,action)=>{
            state.user=action.payload.data
            state.loading=null
            state.status=true
        })
        builder.addCase(auth_login.rejected,(state,action)=>{
       
            state.loading=null,
        state.error = action.payload?.response?.data?.msg
         
        })
    }
})
 
 export const auth_action=auth_slice.actions

const auth_reducer=auth_slice.reducer
export default auth_reducer