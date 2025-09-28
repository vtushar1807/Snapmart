import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemDetail:{},
}

export const ProductDetailSliceReducer = createSlice({
    initialState,
    name:"ProductDetailSliceReducer",
    reducers:{
        addProductDetail:(state, action)=>{
            state.itemDetail=action.payload;
        },
        cleanProductDetail:(state)=>{
            state.itemDetail={}
        }
    }
})

export const {addProductDetail, cleanProductDetail}=ProductDetailSliceReducer.actions;