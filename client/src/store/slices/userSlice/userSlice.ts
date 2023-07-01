import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { IState } from "./types";
import { RootState } from "../../store";








const initialState: IState = {
    user: {
        email: '',
        id: '',
        isActivated: false,
    },
    accessToken: '',
    refreshToken: '',
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<IState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }
    },
})


const isLoadingLogin = (state: RootState) => state.loginSlice.isLoading;
const isLoadingLogout = (state: RootState) => state.logoutSlice.isLoading;
const isLoadingRegistrate = (state: RootState) => state.registerSlice.isLoading;
const isLoadingGetUsers = (state: RootState) => state.getUsersSlice.isLoading;

export const isLoadingSelector = createSelector(isLoadingLogin, isLoadingLogout, isLoadingRegistrate, isLoadingGetUsers, 
    (login, logout, registrate, getUsers) => login || logout || registrate || getUsers
    )

export const { setInfo, setAuth } = userSlice.actions; 
export default userSlice.reducer;