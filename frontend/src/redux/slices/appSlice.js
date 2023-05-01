import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    draggedTaskId: 58,
    draggedFrom: null,
    draggedOverWrapper: null};

export const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDaggedTaskId: (state, action) => {
            return {...state, draggedTaskId: action.payload};
        },
        setDraggedFrom: (state, action) => {
            return {...state, draggedFrom: action.payload};
        },
        setDraggedOverWrapper: (state, action) => {
            return {...state, draggedOverWrapper: action.payload};
        }
    }
});


export const { setDaggedTaskId, setDraggedFrom, setDraggedOverWrapper } = app.actions;
export default app.reducer;