import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLogin:false,
    loggedInUser:{},
}

//ACTIONS

export const validateUser = createAsyncThunk('validateUser', async(user, {rejectWithValue})=>{

    try {
            const response = await fetch('http://localhost:1001/login', {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(user),
                credentials:"include",
            })

            const data = await response.json();
            if(response.ok)
            return data;
            else
            return rejectWithValue(data.msg);
        
                
    } catch (error) {
        return rejectWithValue("Error Requesting Login");
    }
})


export const executeLogout = createAsyncThunk('executeLogout', async (_, {rejectWithValue})=>{
        try {
                const response = await fetch('http://localhost:1001/logout',{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    credentials:"include"
                })

                const data = await response.json();
                if(response.ok)
                    return data;
                else 
                    rejectWithValue("Logout Error");
             } catch (error) {
                    rejectWithValue("Logout Fetching Error");
                }
})



export const LogInSliceReducer = createSlice({
    initialState,
    name:"LogInSliceReducer",
    reducers:{
        removeLogInFn:(state, action)=>{
            state.isLogin=true;
        },

        setLogInFn:(state)=>{
            state.isLogin=false;
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(validateUser.fulfilled, (state, action)=>{
            state.isLogin=true;
            state.loggedInUser=action.payload.user;
        }),

        builder.addCase(validateUser.rejected, (state, action)=>{
            state.isLogin=false;
            console.log(action.payload.msg);
        }),
        builder.addCase(executeLogout.fulfilled, (state, action)=>{
            state.isLogin=false;
            console.log(action.payload.msg);
        }),

        builder.addCase(executeLogout.rejected, (state)=>{
            // state.isLogin=true;
            console.log("Logout Failed in thunk");
        })
    }
})

export const {showLogInFn, removeLogInFn, setLogInFn} = LogInSliceReducer.actions;