


export interface IState {
    user: userType;
    accessToken: string;
    refreshToken: string;
}
type userType = {
    email: string;
    id: string;
    isActivated: boolean;
}