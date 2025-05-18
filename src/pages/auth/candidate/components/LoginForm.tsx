import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Login values:", values);
    // TODO: gọi API đăng nhập tại đây
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="login"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' }
        ]}
      >
        <Input placeholder="Nhập email của bạn" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
        ]}
      >
        <Input.Password
          placeholder="Nhập mật khẩu của bạn"
          iconRender={visible => (visible ? <EyeTwoTone size={18} /> : <EyeInvisibleOutlined size={18} />)}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 18 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-1! h-10 rounded-md bg-[#2196f3] hover:bg-[#64b5f6] border-none text-base font-medium"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
