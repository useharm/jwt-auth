



export interface IState {
    status: 'success' | 'pending' | 'rejected';
    error: any;
}


export interface IAuthResponse {
    user: userType;
    accessToken: string;
    refreshToken: string;
}
type userType = {
    email: string;
    id: string;
    isActivated: boolean;
}