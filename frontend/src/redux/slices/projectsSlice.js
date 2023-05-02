import { createSlice } from "@reduxjs/toolkit";
import { newProject } from "../thunks/projects/newProject";
import { getAllProjects } from "../thunks/projects/getAllProjects";
import { searchProjects } from "../thunks/projects/searchProjects";
import { getAllTeamMembers } from "../thunks/projects/getAllTeamMembers";
import { searchUsers } from "../thunks/projects/searchUsers";
import { deleteProject } from "../thunks/projects/deleteProject";

const initialState = {
        loading: false,
        error: null,
        projectCreated: null,
        projects: [],
        searchResults: [],
        projectsUpdated: false,
        teamMembers: [],
        addedTeamMembers: [],
        projectDeleted: false
    };

export const projects = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        resetProjectCreated: (state) => {
            state.projectCreated = null;
        },
        resetError: (state) => {
            state.error = null;
        },
        setProjectsUpdated: (state) => {
            state.projectsUpdated = Date.now();
        },
        addTeamMember: (state, action) => {
            if(state.addedTeamMembers.filter(member => member.id === action.payload.id).length === 0){
                state.addedTeamMembers.push(action.payload);
            }
        },
        deleteTeamMember: (state, action) => {
            state.addedTeamMembers = state.addedTeamMembers.filter(member => member.id !== action.payload.id);
        },
        clearAddedTeamMembers: (state) => {
            state.addedTeamMembers = [];
        },
        resetProjectDeleted: (state, action) => {
            state.projectDeleted = false;
        }
    },
    extraReducers: {
        // Handle Create New Project
        [newProject.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [newProject.fulfilled]: (state, action) => {
            // console.log("fulfilled");
            state.loading = false;
            if (action.payload.success) {
                state.projectCreated = action.payload.success;
            }
        },
        [newProject.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get All Projects
        [getAllProjects.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getAllProjects.fulfilled]: (state, action) => {
            // console.log("fulfilled");
            state.loading = false;
            if (action.payload.allProjects) {
                state.projects = action.payload.allProjects;
            }
        },
        [getAllProjects.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Search Projects
        [searchProjects.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [searchProjects.fulfilled]: (state, action) => {
            // console.log("fulfilled");
            state.loading = false;
            if (action.payload.searchResults) {
                state.searchResults = action.payload.searchResults;
            }
        },
        [searchProjects.rejected]: (state, action) => {
            // console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Get All Team Members
        [getAllTeamMembers.pending]: (state) => {
            // console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [getAllTeamMembers.fulfilled]: (state, action) => {
            // console.log("fulfilled");
            state.loading = false;
            if (action.payload.teamMembers) {
                state.teamMembers = action.payload.teamMembers.filter(member => member.id !== Number(localStorage.getItem('loggedin')));
            }
        },
        [getAllTeamMembers.rejected]: (state, action) => {
            // console.log("rejected");
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
                state.teamMembers = action.payload.searchResults.filter(member => member.id !== Number(localStorage.getItem('loggedin')));
            }
        },
        [searchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        // Handle Delete Project
        [deleteProject.pending]: (state) => {
            console.log("pending");
            state.loading = true;
            state.error = null;
        },
        [deleteProject.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fullfiled");
            console.log(action.payload);
            state.projectDeleted = action.payload.projectDeleted;
        },
        [deleteProject.rejected]: (state, action) => {
            console.log("rejected");
            state.loading = false;
            state.error = action.error.message;
        }
    }
});


export const { resetProjectCreated, resetError, setProjectsUpdated, addTeamMember, deleteTeamMember, clearAddedTeamMembers, resetProjectDeleted } = projects.actions;
export default projects.reducer;