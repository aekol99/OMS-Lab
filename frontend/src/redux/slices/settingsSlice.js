import { createSlice } from "@reduxjs/toolkit";
import { newUser } from "../thunks/settings/newUser";
import { getAllUsers } from "../thunks/settings/getAllUsers";
import { deleteUser } from "../thunks/settings/deleteUser";
import { changePassword } from "../thunks/settings/changePassword";
import { searchUsers } from "../thunks/settings/searchUsers";

const initialState = {
        loading: false,
        userCreated: null,
        allUsers: null,
        userDeleted: null,
        passwordChanged: false,
        error: null,
    };

export const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetUserCreated: (state) => {
            state.userCreated = null;
        },
        resetError: (state) => {
            state.error = null;
        },
        resetUserDeleted: (state) => {
            state.userDeleted = null;
        },
        resetPasswordChnaged: (state) => {
            state.passwordChanged = null;
        },
    },
    extraReducers: {
        // Handle Create New User
        [newUser.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
            state.userCreated = null;
        },
        [newUser.fulfilled]: (state, action) => {
            // console.log("fulfilled");
            state.loading = false;
            if (action.payload.success) {
                state.userCreated = action.payload.success;
            }
        },
        [newUser.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get All Users
        [getAllUsers.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.allUsers) {
                state.allUsers = action.payload.allUsers;
            }
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Delete User
        [deleteUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.userDeleted = null;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success) {
                state.userDeleted = action.payload.success;
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Change Password
        [changePassword.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.passwordChanged = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            if (action.payload.success) {
                state.passwordChanged = action.payload.success;
            }else{
                state.error = action.payload.error;
            }
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Search Users
        [searchUsers.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [searchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.searchResults) {
                state.allUsers = action.payload.searchResults;
            }
        },
        [searchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});


export const { resetUserCreated, resetError, resetUserDeleted, resetPasswordChnaged } = settings.actions;
export default settings.reducer;