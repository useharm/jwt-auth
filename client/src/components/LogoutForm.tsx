import React from 'react';
import { useAppDispatch } from '../store/store';




const LogoutForm: React.FC = () => {
    const dispatch = useAppDispatch();


    return(<div>
        <button>logout</button>
    </div>)
}


export default LogoutForm;