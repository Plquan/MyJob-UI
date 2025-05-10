import { Form, Input, Button, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Register = () => {
  const [form] = Form.useForm();
  
  return (
    <div className="flex h-screen w-full items-center justify-center" style={{
      background: 'radial-gradient(ellipse at top left, #1a144b 0%, #a12b8c 60%, #c13fa0 100%)'
    }}>
      <div className="w-full max-w-[500px] bg-white px-8 py-4 rounded-lg shadow-lg" style={{ minHeight: 0 }}>
        <h2 className="text-center text-l font-bold mb-5 pt-5">Đăng ký tài khoản</h2>
        
            <Form
            form={form}
            layout="vertical"
            name="register"
            scrollToFirstError
            >
            <Form.Item
            name="fullName"
            label={<span>Họ và tên</span>}
            style={{ marginBottom: 12 }}
            >
            <Input placeholder="Nhập họ tên" className="rounded-md h-8 text-sm" />
            </Form.Item>

            <Form.Item
            name="phone"
            label={<span>Số điện thoại</span>}
            style={{ marginBottom: 12 }}
            >
            <Input placeholder="Nhập số điện thoại" className="rounded-md h-8 text-sm" />
            </Form.Item>

            <Form.Item
            name="email"
            label={<span>Email</span>}
            style={{ marginBottom: 12 }}
            >
            <Input placeholder="Nhập email" className="rounded-md h-8 text-sm" />
            </Form.Item>

            <Form.Item
            name="password"
            label={<span>Mật khẩu</span>}
            style={{ marginBottom: 12 }}
            >
            <Input.Password
                placeholder="Nhập mật khẩu"
                className="rounded-md h-8 text-sm"
                iconRender={visible => (visible ? <EyeTwoTone size={16} /> : <EyeInvisibleOutlined size={16} />)}
            />
            </Form.Item>

            <Form.Item
            name="confirm"
            label={<span>Nhập lại mật khẩu</span>}
            style={{ marginBottom: 12 }}
            >
            <Input.Password
                placeholder="Nhập lại mật khẩu"
                className="rounded-md h-8 text-sm"
                iconRender={visible => (visible ? <EyeTwoTone size={16} /> : <EyeInvisibleOutlined size={16} />)}
            />
            </Form.Item>

            <Form.Item
            name="agreement"
            valuePropName="checked"
            style={{ marginBottom: 12,marginTop:25 }}
            >
            <Checkbox className="text-sm">
                Tôi đồng ý với <a href="#" className="text-blue-500 hover:underline">điều khoản sử dụng</a><span className="text-red-500 ml-1">*</span>
            </Checkbox>
            </Form.Item>


          <Form.Item className="mb-1">
            <Button type="primary" htmlType="submit" className="w-full h-10 rounded-md bg-[#5ea3f7] hover:bg-[#388be0] border-none text-base font-medium" style={{ background: '#5ea3f7', border: 'none' }}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        
        <div className="text-center mt-2 text-sm mb-5">
            Đã có tài khoản? <a href="#" className="text-blue-500 hover:underline">Đăng nhập ngay</a>
        </div>

      </div>
    </div>
  );
};

export default Register;