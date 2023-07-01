import React, { useState } from 'react';
import { inputType } from '../types/inputTypes';
import { useAppDispatch } from '../store/store';
import { registrateUserAsync } from '../store/slices/AsyncSlices/registerSlice/registerSlice';
import { loginUserAsync } from '../store/slices/AsyncSlices/loginSlice/loginSlice';


const LoginForm: React.FC = () => {
    const [value, setValue] = useState<inputType>({
        email: '',
        password: '',
    })
    const dispatch = useAppDispatch();

    return (
        <div>
            <input
            placeholder='enter email'
            value={value.email}
            onChange={(e) => setValue({email: e.target.value, password: value.password})}
            ></input>
            <input
            placeholder='enter password'
            value={value.password}
            onChange={(e) => setValue({email: value.email, password: e.target.value})}
            ></input>
            <button onClick={() => dispatch(loginUserAsync(value))}>sign in</button>
            <button onClick={() => dispatch(registrateUserAsync(value))}>sign up</button>
        </div>
    )
}


export default LoginForm;