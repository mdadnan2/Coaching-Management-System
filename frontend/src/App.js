import { useSelector } from 'react-redux';
import Main from './MainOptimized';
import Login from './login/Login';
import { ToastProvider } from './components/common';

function App() {
  const login = useSelector((state) => state.islogin);

  return (
    <>
      <ToastProvider />
      {login ? <Main /> : <Login />}
    </>
  );
}

export default App;