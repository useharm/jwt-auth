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
    isLoading: false,
}

const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = [];
            state.status = 'pending';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersAsync.fulfilled, (state, action: PayloadAction<userType[]>) => {
            state.isLoading = false;
            state.status = 'success';
            state.users = action.payload;
        });
        builder.addCase(getUsersAsync.pending, (state) => {
            state.isLoading = true;
            state.status = 'pending';
        });
        builder.addCase(getUsersAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
})


export const { clearUsers } = getUsersSlice.actions;
export default getUsersSlice.reducer;