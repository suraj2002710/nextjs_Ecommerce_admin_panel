import { configureStore } from "@reduxjs/toolkit"
import auth_reducer from "./slice/auth_slice"
import product_reducer from "./slice/product_slice"
import category_reducer from "./slice/category_slice"


export const store= configureStore({
    reducer:{
        auth:auth_reducer,
        product:product_reducer,
        category: category_reducer
    }
})

