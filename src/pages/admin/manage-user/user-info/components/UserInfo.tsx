import { Form, Input, Card } from 'antd';

const UserInfo = () => {
  return (
    <Card>
      <Form.Item
        label="Họ tên"
        name="fullName"
        rules={[{ required: true, message: 'Please input full name!' }]}
      >
        <Input className='w-60!'/>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
      >
        <Input className='w-60!'/>
      </Form.Item>

      <Form.Item label="Thay đổi mật khẩu" name="passwordEdit">
        <Input.Password className='w-60!'/>
      </Form.Item>
    </Card>
  );
};

export default UserInfo;
