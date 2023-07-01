import './App.css';
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <LogoutForm />
      <UsersList />
    </div>
  );
}

export default App;
