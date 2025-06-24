import { Button, Divider } from 'antd';
import {  GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {


  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)]" style={{
    }}>
      <div className="w-full max-w-[400px] bg-white px-8 py-4 rounded-lg shadow-lg" style={{ minHeight: 0 }}>
        <h2 className="text-center text-xl font-semibold! mb-8 pt-3">Đăng nhập</h2>

        <LoginForm />

        <Divider plain className="text-base font-semibold">Hoặc</Divider>
        <div className="flex flex-col gap-2 mb-4">
          <Button icon={<GoogleOutlined />} className="w-full h-10 rounded-md border text-base flex items-center justify-center">
            Đăng nhập với Google
          </Button>
          <Button icon={<GithubOutlined />} className="w-full h-10 rounded-md border text-base flex items-center justify-center">
            Đăng nhập với GitHub
          </Button>
        </div>
        <Divider plain className="text-base font-semibold"></Divider>
        <div className="text-center text-sm mb-3 mt-7">
          <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
        </div>
        <div className="text-center text-sm mb-3">
          Chưa có tài khoản? <Link to={ROUTE_PATH.CANDIDATE_REGISTER} className="text-blue-500 hover:underline">
       Đăng ký ngay
      </Link>
        </div>
        <div className="text-center text-sm mb-2">
          <Link to={ROUTE_PATH.HOME} className="text-blue-500 hover:underline">&larr; Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
