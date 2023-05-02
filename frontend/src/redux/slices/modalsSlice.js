import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openedTaskModal: {state: false, id: null},
    newTaskModal: {state: false, area: null, order: null},
    newBoardModal: {state: false},
    projectSearchModal: {state: false},
    newProjectModal: {state: false},
    notificationsModal: {state: false},
    settingsModal: {state: false, section: "options", data: null},
    profileModal: {state: false},
    renameBoardModal: {state: false, boardid: null, boardName: ""},
    deleteBoardModal: {state: false, boardid: null, boardName: "", afterDeleteTarget: null},
    deleteTaskModal: {state: false, taskid: null, taskName: null},
    deleteProjectModal: {state: false, projectid: null, projectName: null}
};

export const modals = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setOpenedTaskModal: (state, action) => {
            return {...state, openedTaskModal: {state: action.payload.state, id: action.payload.id}};
        },
        setNewTaskModal: (state, action) => {
            return {...state, newTaskModal: {state: action.payload.state, area: action.payload.area, order: action.payload.order}};
        },
        setNewBoardModal: (state, action) => {
            return {...state, newBoardModal: {state: action.payload.state}};
        },
        setRenameBoardModal: (state, action) => {
            return {...state, renameBoardModal: {state: action.payload.state, boardid: action.payload.boardid, boardName: action.payload.boardName}};
        },
        setDeleteBoardModal: (state, action) => {
            return {...state, deleteBoardModal: {state: action.payload.state, boardid: action.payload.boardid, boardName: action.payload.boardName, afterDeleteTarget: action.payload.afterDeleteTarget}};
        },
        setProjectSearchModal: (state, action) => {
            return {...state, projectSearchModal: {state: action.payload.state}};
        },
        setNewProjectModal: (state, action) => {
            return {...state, newProjectModal: {state: action.payload.state}};
        },
        // Notifications Modal
        setNotificationsModal: (state, action) => {
            return {...state, notificationsModal: {state: action.payload.state}};
        },
        // Setting Modal
        setSettingsModal: (state, action) => {
            state.settingsModal.state = action.payload.state;
        },
        setSettingsModalSection: (state, action) => {
            state.settingsModal.section = action.payload.section;
            state.settingsModal.data = action.payload.data;
        },
        // Profile Modal
        setProfileModal: (state, action) => {
            return {...state, profileModal: {state: action.payload.state}};
        },
        setDeleteTaskModal: (state, action) => {
            return {...state, deleteTaskModal: {state: action.payload.state, taskid: action.payload.taskid, taskName: action.payload.taskName}};
        },
        setDeleteProjectModal: (state, action) => {
            return {...state, deleteProjectModal: {state: action.payload.state, projectid: action.payload.projectid, projectName: action.payload.projectName}};
        }
    }
});


export const { setOpenedTaskModal, setNewTaskModal, setNewBoardModal, setRenameBoardModal, setDeleteBoardModal, setProjectSearchModal, setNewProjectModal, setNotificationsModal, setSettingsModal, setSettingsModalSection, setProfileModal, setDeleteTaskModal, setDeleteProjectModal } = modals.actions;
export default modals.reducer;