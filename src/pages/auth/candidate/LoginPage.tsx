import { Form, Input, Button, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';
const LoginPage = () => {
  const [form] = Form.useForm();

  return (
    <div className="flex h-screen w-full items-center justify-center" style={{
      background: 'radial-gradient(ellipse at top left, #1a1a1a 0%, #4B0082 100%)'
    }}>
      <div className="w-full max-w-[400px] bg-white px-8 py-4 rounded-lg shadow-lg" style={{ minHeight: 0 }}>
        <h2 className="text-center text-xl font-bold mb-8 pt-5">Đăng nhập</h2>
        <Form
          form={form}
          layout="vertical"
          name="login"
        >
          <Form.Item
            name="email"
            label={<span>Email</span>}
            style={{ marginBottom: 18 }}
          >
            <Input placeholder="Nhập email của bạn" className="rounded-md h-10 text-base" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span>Mật khẩu</span>}
            style={{ marginBottom: 18 }}
          >
            <Input.Password
              placeholder="Nhập mật khẩu của bạn"
              className="rounded-md h-10 text-base"
              iconRender={visible => (visible ? <EyeTwoTone size={18} /> : <EyeInvisibleOutlined size={18} />)}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 18 }}>
          <Button type="primary" htmlType="submit"
            className="w-full h-10 rounded-md bg-[#2196f3] hover:bg-[#64b5f6] border-none text-base font-medium"
            >
            Đăng nhập
            </Button>
          </Form.Item>
        </Form>
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
          Chưa có tài khoản? <a href={ROUTE_PATH.CANDIDATE_REGISTER} className="text-blue-500 hover:underline">Đăng ký ngay</a>
        </div>
        <div className="text-center text-sm mb-5">
          <a href={ROUTE_PATH.HOME} className="text-blue-500 font-bold hover:underline">&larr; Trở về Trang chủ</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
