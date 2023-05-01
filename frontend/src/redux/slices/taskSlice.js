import { createSlice } from "@reduxjs/toolkit";
import { newTask } from "../thunks/task/newTask";
import { updateTaskData } from "../thunks/task/updateTaskData";
import { deleteTask } from "../thunks/task/deleteTask";
import { getTaskInfos } from "../thunks/task/getTaskInfos";
import { changeTaskInfos } from "../thunks/task/changeTaskInfos";
import { getTaskComments } from "../thunks/task/getTaskComments";
import { newTaskComment } from "../thunks/task/newTaskComment";
import { deleteTaskComment } from "../thunks/task/deleteTaskComment";

const initialState = {
    newTaskAdded: false,
    tasks: null,
    taskDataUpdated: false,
    taskDeleted: false,
    activeSection: 'options',
    taskInfos: null,
    taskChanged: false,
    taskComments: null,
    taskCommentAdded: null,
    commentDeleted: false
};

export const task = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetNewTaskAdded: (state, action) => {
            state.newTaskAdded = false;
        },
        resetTaskDeleted: (state, action) => {
            state.taskDeleted = false;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setTaskInfos: (state, action) => {
            state.taskInfos[action.payload.target] = action.payload.value;
        },
        resetTaskChanged: (state, action) => {
            state.taskChanged = false;
        },
        resetTaskCommentAdded: (state, action) => {
            state.taskCommentAdded = null;
        },
        addNewComment: (state, action) => {
            state.taskComments.push(action.payload);
        },
        resetCommentDeleted: (state, action) => {
            state.commentDeleted = false;
        }
    },
    extraReducers: {
        // Handle Add Task
        [newTask.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [newTask.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.newTaskAdded = action.payload.taskCreated;
        },
        [newTask.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Update Task Data
        [updateTaskData.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [updateTaskData.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.taskDataUpdated = action.payload.taskDataUpdated;
        },
        [updateTaskData.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Delete Task
        [deleteTask.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.taskDeleted = action.payload.taskDeleted;
        },
        [deleteTask.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get Task Infos
        [getTaskInfos.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getTaskInfos.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.taskInfos = action.payload.taskInfos;
        },
        [getTaskInfos.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Change Task Infos
        [changeTaskInfos.pending]: (state) => {
            console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [changeTaskInfos.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fullfiled");
            state.taskChanged = action.payload.taskChanged;
        },
        [changeTaskInfos.rejected]: (state, action) => {
            console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get Task Comments
        [getTaskComments.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getTaskComments.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.taskComments = action.payload.taskComments;
        },
        [getTaskComments.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle New Task Comment
        [newTaskComment.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [newTaskComment.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.taskCommentAdded = action.payload.taskCommentAdded;
            state.taskComments.push(action.payload.comment);
        },
        [newTaskComment.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Delete Task
        [deleteTaskComment.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [deleteTaskComment.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            console.log(action.payload);
            state.commentDeleted = action.payload.commentDeleted;
            state.taskComments = state.taskComments.filter(comment => comment.id != action.payload.commentId);
        },
        [deleteTaskComment.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        }
    }
});


export const { resetNewTaskAdded, resetTaskDeleted, setActiveSection, setTaskInfos, resetTaskChanged, resetTaskCommentAdded, addNewComment, resetCommentDeleted } = task.actions;
export default task.reducer;