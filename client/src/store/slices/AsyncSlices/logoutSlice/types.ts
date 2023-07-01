



export interface IState {
    status: 'pending' | 'success' | 'rejected';
    error: any;
    isLoading: boolean;
}