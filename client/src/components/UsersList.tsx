import React from 'react';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { getUsersAsync } from '../store/slices/AsyncSlices/getUsersSlice/getUsersSlice';




const UsersList: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useSelector((state: RootState) => state.getUsersSlice.users);
    const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

    return(
        <div>
            <button onClick={() => dispatch(getUsersAsync())} disabled={isAuth ? false : true}>users list</button>
            {isAuth ? users.map((item, index) => (<div key={index}>
                <h3>email - {item.email}</h3>
                <h4>is activated - {item.isActivated ? 'true' : 'false'}</h4>
                </div>)) : null}
        </div>
    )
}


export default UsersList;