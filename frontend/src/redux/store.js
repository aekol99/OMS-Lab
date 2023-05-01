import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import projectReducer from "./slices/projectSlice";
import authReducer from "./slices/authSlice";
import modalsReducer from "./slices/modalsSlice";
import settingsReducer from "./slices/settingsSlice";
import projectsReducer from "./slices/projectsSlice";
import notificationsReducer from "./slices/notificationsSlice";
import boardsReducer from "./slices/boardsSlice";
import profileReducer from './slices/profileSlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
    reducer: {
                auth: authReducer,
                app: appReducer,
                project: projectReducer,
                modals: modalsReducer,
                settings: settingsReducer,
                projects: projectsReducer,
                notifications: notificationsReducer,
                boards: boardsReducer,
                profile: profileReducer,
                task: taskReducer
                                        }
});

export default store;