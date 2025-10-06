import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    currentItems: []
}

//ACTION
export const fetchCartItems = createAsyncThunk('fetchCartItems', async(ids, {rejectWithValue})=>{

    try {
        const response = await Promise.all(ids.map(async (id) => {

            const result = await fetch('http://localhost:1001/product/cart', {
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "id":String(id),
                }
            });
          
            if(!result.ok)
                throw new Error('Error fetching product with id: ', id);

            return await result.json();
        }))

            const products = response.map((item) => item.product);
            return {
                msg:"Cart Products fetched successfully",
                product:products,
            }
            
    } catch (error) {
        return rejectWithValue("Error fetching cart items");
    }
})

export const CartSliceReducer = createSlice({

    initialState,
    name:"CartSliceReducer",
    reducers:{
        addItemToCart:(state,action)=>{

            state.cartItems.push(action.payload.id);
        },

        removeItemFromCart:(state, action)=>{
            const IDToDelete=action.payload.id;
            const restItems = state.cartItems.filter((id) => id!==IDToDelete);
            state.cartItems=restItems;
        },
        emptyCart:(state)=>{
            state.cartItems=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartItems.fulfilled, (state, action)=>{
            console.log("Message: ", action.payload.msg);
        }),
        builder.addCase(fetchCartItems.rejected, (state, action)=>{
            console.log("Message: ", action.payload.msg);
        })
    }
})

export const {addItemToCart, removeItemFromCart, emptyCart}=CartSliceReducer.actions;