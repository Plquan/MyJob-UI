
import { useEffect, useState } from 'react';
import LeftSide from './components/LeftSide';
import FormLogin from './components/LoginForm';

const Login = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen w-full" style={{
      background: 'linear-gradient(120deg,rgb(0, 0, 0) 0%,rgb(98, 10, 161) 100%)' 
    }}>
      <LeftSide mounted={mounted} />
      <FormLogin mounted={mounted} />
    </div>
  );
};

export default Login;