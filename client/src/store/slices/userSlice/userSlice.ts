import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IState } from "./types";








const initialState: IState = {
    user: {
        email: '',
        id: '',
        isActivated: false,
    },
    accessToken: '',
    refreshToken: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<IState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        }
    },
})

export const { setInfo } = userSlice.actions; 
export default userSlice.reducer;