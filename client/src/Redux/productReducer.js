import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    groceryArr:[],
    womenArr:[],
    jewelleryArr:[],
    menArr:[],
    perfumesArr:[],
    shoesArr:[],
    smartphonesArr:[],
    watchesArr:[],
}

//ACTION 
export const accessHomepage = createAsyncThunk('accessHomepage', async(_, {rejectWithValue})=>{
    try {
        const response = await fetch('http:localhost:1010', {
            method:"GET",
        })

        const data = await response.json();
        if(response.ok)
            return data;

        else
            rejectWithValue("Login First");
    } catch (error) {
        rejectWithValue(error.msg);
    }
})


export const ProductSliceReducer = createSlice({
    initialState,
    name:"ProductSliceReducer",
    reducers:{
        
        setGroceryFn:(state, action)=>{
            state.groceryArr=action.payload;
        },

        setWomenFn:(state, action)=>{
            state.womenArr=action.payload;
        },

        setJewelleryFn:(state, action)=>{
            state.jewelleryArr=action.payload;
        },

        setMenFn:(state, action)=>{
            state.menArr=action.payload;
        },

        setPerfumesFn:(state, action)=>{
            state.perfumesArr=action.payload;
        },

        setShoesFn:(state, action)=>{
            state.shoesArr=action.payload;
        },

        setSmartphonesFn:(state, action)=>{
            state.smartphonesArr=action.payload;
        },

        setWatchesFn:(state, action)=>{
            state.watchesArr=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(accessHomepage.fulfilled, (state,action)=>{
            console.log("Authorized Successfully");
        }),
        builder.addCase(accessHomepage.rejected, (state,action)=>{
            console.log("Authorization Failure");
        })
    }
})

export const {setGroceryFn, setWomenFn, setJewelleryFn, setMenFn, setPerfumesFn, setShoesFn, setSmartphonesFn, setWatchesFn} = ProductSliceReducer.actions;