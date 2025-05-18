import ROUTE_PATH from '../../../routes/routePath';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)]">
      <div className="w-full max-w-[500px] bg-white px-8 py-4 rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-semibold! mb-8 pt-3">Đăng ký tài khoản</h2>
        
        <RegisterForm />
      
        <div className="text-center mt-2 text-sm mb-3">
            Đã có tài khoản? <a href={ROUTE_PATH.CANDIDATE_LOGIN} className="text-blue-500 hover:underline"> Đăng nhập ngay</a>
        </div>

        <div className="text-center mt-2 text-sm mb-3">
            <a href={ROUTE_PATH.HOME} className="text-blue-500 hover:underline">&larr; Trở về trang chủ</a>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;