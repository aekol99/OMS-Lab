import { createSlice } from "@reduxjs/toolkit";
import { getUserInfos } from "../thunks/profile/getProfileInfos";

const initialState = {
        loading: false,
        error: null,
        profileInfos: null
    };

export const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        // Handle Get Profile Infos
        [getUserInfos.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [getUserInfos.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
            if (action.payload.profileInfos) {
                state.profileInfos = action.payload.profileInfos;
            }
        },
        [getUserInfos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        }
    }
});


export const {  } = profile.actions;
export default profile.reducer;