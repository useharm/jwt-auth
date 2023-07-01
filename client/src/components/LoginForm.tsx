import React, { useState } from 'react';
import { inputType } from '../types/inputTypes';


const LoginForm: React.FC = () => {
    const [value, setValue] = useState<inputType>({
        email: '',
        password: '',
    })


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
            <button>sign in</button>
            <button>sign up</button>
        </div>
    )
}


export default LoginForm;