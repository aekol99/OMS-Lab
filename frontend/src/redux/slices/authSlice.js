import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/auth/login";

const initialState = {
        token: localStorage.getItem("loggedin"),
        isAdmin: localStorage.getItem("isAdmin") === "true",
        loading: false,
        error: null,
    };

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("loggedin");
            state.token = null;
            localStorage.removeItem("isAdmin");
            state.isAdmin = null;
        }
    },
    extraReducers: {
        // Handle Login Thunk
        [login.pending]: (state) => {
            state.loading = true;
            state.error = null;
            console.log("pending");
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
            // console.log(action.payload);
            if (action.payload.id) {
                state.token = action.payload.id;
                state.isAdmin = action.payload.isAdmin === "admin";
                localStorage.setItem("loggedin", action.payload.id);
                localStorage.setItem("isAdmin", action.payload.isAdmin === "admin");
            }else {
                state.error = action.payload.error;
            }
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            console.log("rejected");
        }
    }
});


export const { logout } = auth.actions;
export default auth.reducer;