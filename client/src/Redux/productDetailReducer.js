import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    itemDetail:{},
}

//ACTION
export const fetchProductDetail = createAsyncThunk('fetchProductDetail', async (id, {rejectWithValue})=>{
    try {
        const response = await fetch(`http://localhost:1001/product/detail/${id}`, {
            method:"GET"
        })

        const data = await response.json();

        if(response.ok)
            return data;
        else{
            if(response.status==404)
                return rejectWithValue(data.msg);
            else
                return rejectWithValue("Can'nt fetch product details");
        }
            
    } catch (error) {
            return rejectWithValue("Server Error: Network Issue");
    }
})

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
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProductDetail.fulfilled, (state, action)=>{
            console.log(action.payload.msg);
        }),

        builder.addCase(fetchProductDetail.rejected, (state, action)=>{
            console.log(action.payload);
        })
    }
})

export const {addProductDetail, cleanProductDetail}=ProductDetailSliceReducer.actions;