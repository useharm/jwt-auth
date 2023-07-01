

interface IusersInfo {
     users: userType[];
}
export interface IState extends IusersInfo {
    status: 'pending' | 'success' | 'rejected';
    error: any;
    isLoading: boolean;
}
export type userType = {
    _id: string;
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    __v: number;
}