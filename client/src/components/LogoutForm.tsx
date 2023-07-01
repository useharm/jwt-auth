import React from 'react';
import { useAppDispatch } from '../store/store';
import { logoutAsync } from '../store/slices/AsyncSlices/logoutSlice/logoutSlice';




const LogoutForm: React.FC = () => {
    const dispatch = useAppDispatch();


    return(<div>
        <button onClick={() => dispatch(logoutAsync())}>logout</button>
    </div>)
}


export default LogoutForm;