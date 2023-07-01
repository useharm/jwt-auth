import { useSelector } from 'react-redux';
import './App.css';
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm';
import UsersList from './components/UsersList';
import { RootState } from './store/store';
import { isLoadingSelector } from './store/slices/userSlice/userSlice';

function App() {
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);
  const isLoading = useSelector(isLoadingSelector);
  return (
    <div className="App">
      {isLoading ? 
      <div className='loading_window'><h1>Загрузка ...</h1></div>
       : null}
      {isAuth ? <h3>Вы авторизованы!</h3> : <h3>Авторизуйтесь!</h3>}
      {isAuth ? null : <LoginForm />}
      {isAuth ? <LogoutForm /> : null}
      <UsersList />
    </div>
  );
}

export default App;
