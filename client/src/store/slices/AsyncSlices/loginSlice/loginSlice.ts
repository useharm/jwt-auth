import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../../../services/auth-service";
import { inputType } from "../../../../types/inputTypes";
import { IAuthResponse, IState } from "../types";
import { setAuth, setInfo } from "../../userSlice/userSlice";




export const loginUserAsync = createAsyncThunk('login/loginAsync', async ({email, password}: inputType, ThunkAPI) => {
    try {
        const response = await AuthService.login({email, password});
        localStorage.setItem('token', response.data.accessToken);
        ThunkAPI.dispatch(setInfo(response.data));
        ThunkAPI.dispatch(setAuth(true));
        return response.data as IAuthResponse;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error)
    }

})


const initialState: IState = {
    status: 'pending',
    error: '',
    isLoading: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUserAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.status = 'success';
        });
        builder.addCase(loginUserAsync.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(loginUserAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.status = 'rejected';
            state.error = action.payload;
        })
    },
})


export default loginSlice.reducer;
