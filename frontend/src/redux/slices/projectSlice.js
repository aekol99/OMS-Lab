import { createSlice } from "@reduxjs/toolkit";
import { checkProjectMember } from "../thunks/project/checkProjectMember";
import { getAllTasks } from "../thunks/task/getAllTasks";
import { getProjectMembers } from "../thunks/project/getProjectMembers";

const initialState = {
    projectTasksWrappers: {todo: [], inprogress: [], blocked: [], finished: []},
    moveAfterTaskID: {target: null, where: 'after'},
    moveInEmptyWrapper: {target: null},
    isProjectMember: false,
    projectMembers: null
};

export const project = createSlice({
    name: 'project',
    initialState,
    reducers: {
        changeTaskState: (state, action) => {
            // getting the task
            let task = state.projectTasksWrappers[action.payload.from].filter(task => task.id === action.payload.id)[0];
            // deleting the task
            state.projectTasksWrappers[action.payload.from] = state.projectTasksWrappers[action.payload.from].filter(task => task.id !== action.payload.id);
            // adding the task to new position
            state.projectTasksWrappers[action.payload.to].splice(action.payload.index,0,task);
        },
        setMoveAfterTaskID: (state, action) => {
            state.moveAfterTaskID = action.payload;
        },
        setMoveInEmptyWrapper: (state, action) => {
            state.moveInEmptyWrapper = action.payload;
        },
        changeTaskName: (state, action) => {
            state.projectTasksWrappers[action.payload.status].filter(task => task.id === action.payload.id)[0].name = action.payload.value;
        }
    },
    extraReducers: {
        // Handle Check Project Member
        [checkProjectMember.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [checkProjectMember.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            state.isProjectMember = action.payload.isProjectMember;
        },
        [checkProjectMember.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get All Tasks
        [getAllTasks.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("fullfiled");
            if (action.payload.tasks) {
                state.projectTasksWrappers = action.payload.tasks;
            }
        },
        [getAllTasks.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get Project Members
        [getProjectMembers.pending]: (state) => {
            console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getProjectMembers.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fullfiled");
            if (action.payload.projectMembers) {
                state.projectMembers = action.payload.projectMembers;
            }
        },
        [getProjectMembers.rejected]: (state, action) => {
            console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        }
    }
});


export const { changeTaskState, setMoveAfterTaskID, setMoveInEmptyWrapper, changeTaskName } = project.actions
export default project.reducer;