import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications } from "../thunks/notifications/getAllNotifications";

const initialState = {
        loading: false,
        error: null,
        notifications: []
    };

export const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: {
        // Handle Get All Notifications
        [getAllNotifications.pending]: (state) => {
            state.loading = true;
            state.error = null;
            console.log("getting notifications");
        },
        [getAllNotifications.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
            if (action.payload.allNotifications) {
                state.notifications = action.payload.allNotifications;
            }
        },
        [getAllNotifications.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        }
    }
});


export const {  } = notifications.actions;
export default notifications.reducer;