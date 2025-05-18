import { Checkbox, Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const RegisterForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="register"
      scrollToFirstError
    >
      <Form.Item
        name="fullName"
        label="Họ và tên"
        style={{ marginBottom: 12 }}
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
      >
        <Input placeholder="Nhập họ tên" className="rounded-md h-8 text-sm" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        style={{ marginBottom: 12 }}
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ' }
        ]}
      >
        <Input placeholder="Nhập số điện thoại" className="rounded-md h-8 text-sm" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        style={{ marginBottom: 12 }}
        rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' }
        ]}
      >
        <Input placeholder="Nhập email" className="rounded-md h-8 text-sm" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        style={{ marginBottom: 12 }}
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
          { min: 1, message: 'Mật khẩu phải có ít nhất 1 ký tự' }
        ]}
        hasFeedback
      >
        <Input.Password
          placeholder="Nhập mật khẩu"
          className="rounded-md h-8 text-sm"
          iconRender={visible => (visible ? <EyeTwoTone size={16} /> : <EyeInvisibleOutlined size={16} />)}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        style={{ marginBottom: 12 }}
        rules={[
          { required: true, message: 'Vui lòng nhập lại mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không khớp'));
            },
          }),
        ]}
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
        style={{ marginBottom: 12, marginTop: 25 }}
      >
        <Checkbox className="text-sm">
          Tôi đồng ý với <a href="#" className="text-blue-500 hover:underline">điều khoản sử dụng</a>
          <span className="text-red-500 ml-1">*</span>
        </Checkbox>
      </Form.Item>

      <Form.Item className="mb-1">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-10 rounded-md bg-[#5ea3f7] hover:bg-[#388be0] border-none text-base font-medium"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
