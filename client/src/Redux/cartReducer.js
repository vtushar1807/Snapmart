import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    // totalQuantity:0,
    // totalAmount:0,
}

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
    }
})

export const {addItemToCart, removeItemFromCart, emptyCart}=CartSliceReducer.actions;