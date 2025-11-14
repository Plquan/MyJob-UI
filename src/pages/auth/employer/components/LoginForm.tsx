import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ROUTE_PATH from '../../../../routes/routePath';
import type { ILoginRequestData } from '../../../../types/auth/AuthType';
import authService from '../../../../services/authService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { authActions } from '../../../../stores/authStore/authReducer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../stores';


const FormLogin = ({ mounted }: { mounted: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm<ILoginRequestData>();
    const slideLogin = mounted ? 'translate-y-0 opacity-100 transition-all duration-600 ease-out' : 'translate-y-80 opacity-0';
    const handleLogin = async () => {
        try {
            const values = await form.getFieldsValue();
            const response = await authService.companyLogin(values);
            localStorage.setItem("accessToken", response);
            dispatch(authActions.getCurrentUser());
            toast.success("Đăng nhập thành công");
            navigate(ROUTE_PATH.HOME);
        } catch (error:any) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
      <div className={"flex flex-1 items-center justify-center " + slideLogin}>
        <div className="h-[520px] w-[400px] rounded-xl shadow-xl flex flex-col items-center justify-center" style={{ background: '#f8f3fa' }}>
          <h2 className="text-center text-2xl font-sm mb-5!" style={{ color: "#222" }}>Đăng nhập</h2>
          <div className="w-[330px] h-[400px] bg-white rounded-xl shadow-xl p-8">
            <Form
              form={form}
              layout="vertical"
              name="login-employer"
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                label={
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-sm text-base">Email</span>
                  </span>
                }
                style={{ marginBottom: 18 }}
              >
                <Input placeholder="Nhập email của bạn" className="rounded-md h-10 text-base" />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-sm text-base">Mật khẩu</span>
                  </span>
                }
                style={{ marginBottom: 24 }}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  className="rounded-md h-10 text-base"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 rounded-xl text-lg font-semibold"
                  style={{
                    background: 'linear-gradient(90deg, #1a1a1a 0%,  rgb(66, 52, 151) 100%)',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 2px 8px 0 rgba(87, 6, 146, 0.10)',
                    height: '45px',
                    marginTop: '10px',
                  }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center text-sm mt-7 mb-5">
              <a href="#" className="text-gray-500 hover:underline">Quên mật khẩu?</a>
            </div>
            <div className="text-center text-sm">
              Chưa có tài khoản? <a  onClick={() => navigate(ROUTE_PATH.EMPLOYER_REGISTER)} className="text-[#7B68EE] font-semibold hover:underline cursor-pointer">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default FormLogin