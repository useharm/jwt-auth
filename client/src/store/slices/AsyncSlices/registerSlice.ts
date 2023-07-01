import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';




const registrateUserAsync = createAsyncThunk('register/registrateAsync', async (_, ThunkAPI) => {
    try {
        
    } catch (error) {
        
    }

})


const initialState = {

}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: {},
})