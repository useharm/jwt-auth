import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from '../../../../http/index';
import { IState, userType } from "./types";






export const getUsersAsync = createAsyncThunk('getUsers/getUsersAsync', async (_, ThunkAPI) => {
    try {
        const response = await $api.get('/users');
        return response.data as userType[];
    } catch (error) {
        return ThunkAPI.rejectWithValue(error)
    }
})

const initialState: IState = {
    users: [],
    status: 'pending',
    error: '',
}

const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersAsync.fulfilled, (state, action: PayloadAction<userType[]>) => {
            state.status = 'success';
            state.users = action.payload;
        });
        builder.addCase(getUsersAsync.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(getUsersAsync.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
})


export default getUsersSlice.reducer;