import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    users:{},
    isError:false,
}


//ACTION
export const createNewuser = createAsyncThunk('createNewUser', async(user, {rejectWithValue})=>{

        try {
            const response = await fetch('http://localhost:1001/signup',{
                method:'POST',
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(user),
                credentials:"include"
            })

            const data = await response.json();
            if(response.ok)
                return data;
            else
                return rejectWithValue(data.msg);
            
        } catch (error) {
            console.log("Signup Error", error);
            return rejectWithValue("Error Registering New User");
        }
});

export const SignUpSliceReducer = createSlice({
    initialState,
    name:"SignupSliceReducer",

    extraReducers:(builder)=>{
        builder.addCase(createNewuser.fulfilled, (state, action)=>{
            // state.users.push(action.payload.)
            if(action.payload.user)
                state.users=action.payload.user;

            // console.log(action.payload.user);
        }),

        builder.addCase(createNewuser.rejected, (state,action)=>{
            state.isError=false;
            console.log("Fetching error while Login");
        })
    },

    reducers:{

        removeSignupFn:(state, action)=>{

            const newUser = {
                username:action.payload.username,
                email:action.payload.email,
                password:action.payload.password,
            }

            state.users.push(newUser);
            window.localStorage.setItem("SignedUpUsers", JSON.stringify(state.users));
        },

    }
})

export const {removeSignupFn} = SignUpSliceReducer.actions;