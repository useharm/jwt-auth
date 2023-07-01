import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './slices/AsyncSlices/registerSlice/registerSlice';
import loginSlice from "./slices/AsyncSlices/loginSlice/loginSlice";
import getUsersSlice from "./slices/AsyncSlices/getUsersSlice/getUsersSlice";
import logoutSlice from "./slices/AsyncSlices/logoutSlice/logoutSlice";
import userSlice from "./slices/userSlice/userSlice";
import { useDispatch } from "react-redux";




export const store = configureStore({
    reducer: {
        registerSlice,
        loginSlice,
        getUsersSlice,
        logoutSlice,
        userSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;