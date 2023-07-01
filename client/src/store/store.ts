import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './slices/AsyncSlices/registerSlice/registerSlice';
import loginSlice from "./slices/AsyncSlices/loginSlice/loginSlice";
import getUsersSlice from "./slices/AsyncSlices/getUsersSlice/getUsersSlice";
import { useDispatch } from "react-redux";




export const store = configureStore({
    reducer: {
        registerSlice,
        loginSlice,
        getUsersSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;