import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './slices/AsyncSlices/registerSlice/registerSlice';
import { useDispatch } from "react-redux";




export const store = configureStore({
    reducer: {
        registerSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;