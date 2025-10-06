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
        const response = await fetch('http://localhost:1001', {
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

export const fetchProducts = createAsyncThunk('fetchProducts', async(cat, {rejectWithValue})=>{

    try{
            const response = await fetch(`http://localhost:1001/product/category/${cat}`, {method:"GET"});
            const result = await response.json();

            if(response.ok)
                return result.product;
            else
                return rejectWithValue("Can'nt find products");
        }
        catch(err)
        {
            return rejectWithValue("Error fetching products");
        }
})

export const subscribeUser = createAsyncThunk('subscribeUser', async(user, {rejectWithValue})=>{

    try {
            const response = await fetch('http://localhost:1001/email/subscribe', {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(user),
                // credentials:"include",
            })

            const data = await response.json();

            if(response.ok){
                alert('Subscription added successfully🎉');
                return data;
                }
            
            else
            {
                if(response.status==409){
                alert('You are already subscribed with this email address.');
                return rejectWithValue("Already Subscribed🚫");
                }
                return rejectWithValue(data.msg || "Subscription failed due to Server Error");
            }
            }

    catch (error) {
        return rejectWithValue("Error in Subscribing, Network issue");
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
        }),

        builder.addCase(fetchProducts.fulfilled, (state, action)=>{
            console.log("Fetched the Products");
        }),

        builder.addCase(fetchProducts.rejected, (state, action)=>{
            console.log("Fetched Rejected");
        }),
        builder.addCase(subscribeUser.fulfilled, (state,action)=>{
            if(action.payload.msg)
            console.log(action.payload);
            else
            console.log(action.payload);
            
        }),
        builder.addCase(subscribeUser.rejected, (state, action)=>{
            console.log(action.payload);
        })
    }
})

export const {setGroceryFn, setWomenFn, setJewelleryFn, setMenFn, setPerfumesFn, setShoesFn, setSmartphonesFn, setWatchesFn} = ProductSliceReducer.actions;