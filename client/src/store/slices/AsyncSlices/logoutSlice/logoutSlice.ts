import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthService from "../../../../services/auth-service"
import { IState } from "./types";
import { setAuth } from "../../userSlice/userSlice";
import { clearUsers } from "../getUsersSlice/getUsersSlice";




export const logoutAsync = createAsyncThunk('logout/logoutUser', async (_, ThunkAPI) => {
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        ThunkAPI.dispatch(setAuth(false));
        ThunkAPI.dispatch(clearUsers());
        return response.data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error)
    }
})

const initialState: IState = {
    status: 'pending',
    error: '',
    isLoading: false,
}

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logoutAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.status = 'success';
        });
        builder.addCase(logoutAsync.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(logoutAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.status = 'rejected';
            state.error = action.payload;
        })
    },
})


export default logoutSlice.reducer;