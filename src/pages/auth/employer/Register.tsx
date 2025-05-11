
import { useEffect, useState } from 'react';
import LeftSide from './components/LeftSide';
import RegisterForm from './components/RegisterForm';
const Register = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen w-full" style={{
      background: 'linear-gradient(120deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)' 
    }}>
      <LeftSide mounted={mounted} />
      <RegisterForm mounted={mounted} />
    </div>
  );
};

export default Register;