


export interface IState {
    user: userType;
    accessToken: string;
    refreshToken: string;
    isAuth: boolean;
}
type userType = {
    email: string;
    id: string;
    isActivated: boolean;
}