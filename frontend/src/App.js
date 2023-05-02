import './App.css';

import Login from './pages/login/Login';
import Main from './pages/main/Main';
// import TasksWrappers from './components/tasksWrappers/TasksWrappers';

import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token );

  return (
    <>
      { token ? <Main /> : <Login />}
    </>
  );
}

export default App;
