import { createSlice } from "@reduxjs/toolkit";
import { getAllBoards } from "../thunks/boards/getAllBoards";
import { newBoard } from "../thunks/boards/newBoard";
import { setProjectLastUpdates } from "../thunks/boards/setProjectLastUpdates";
import { renameBoard } from "../thunks/boards/renameBoard";
import { deleteBoard } from "../thunks/boards/deleteBoard";
import { getProjectInfos } from "../thunks/projects/getProjectInfos";

const initialState = {
        loading: false,
        error: null,
        boards: [],
        boardCreated: false,
        boardInfos: null,
        boardRenamed: false,
        boardDeleted: false,
        projectInfos: []
    };

export const boards = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        resetBoardCreated: (state, action) => {
            state.boardCreated = false;
        },
        resetBoardDeleted: (state, action) => {
            state.boardDeleted = false;
        }
    },
    extraReducers: {
        // Handle Get All Notifications
        [getAllBoards.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [getAllBoards.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
            if (action.payload.boards) {
                state.boards = action.payload.boards;
            }
        },
        [getAllBoards.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        },
        // Handle Create New Board
        [newBoard.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [newBoard.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
            if (action.payload.boardCreated) {
                state.boardCreated = action.payload.boardCreated;
            }
        },
        [newBoard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        },
        // Handle Update Last Viewed Board
        [setProjectLastUpdates.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [setProjectLastUpdates.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fulfilled");
        },
        [setProjectLastUpdates.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        },
        // Handle Rename Board
        [renameBoard.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [renameBoard.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.boardRenamed) {
                state.boardRenamed = action.payload.boardRenamed;
            }
            // console.log("fulfilled");
        },
        [renameBoard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        },
        // Handle Delete Board
        [deleteBoard.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [deleteBoard.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.boardDeleted) {
                state.boardDeleted = action.payload.boardDeleted;
            }else{
                console.log("Sorry, this is the only board in this project.");
            }
            // console.log("fulfilled");
        },
        [deleteBoard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        },
         // Handle Get Project Infos
         [getProjectInfos.pending]: (state) => {
            state.loading = true;
            state.error = null;
            // console.log("pending");
        },
        [getProjectInfos.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.projectInfos) {
                state.projectInfos = action.payload.projectInfos;
            }
            // console.log("fulfilled");
        },
        [getProjectInfos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            // console.log("rejected");
        }
    }
});


export const { resetBoardCreated, resetBoardDeleted } = boards.actions;
export default boards.reducer;