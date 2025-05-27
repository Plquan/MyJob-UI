import { Form, Button, Row, Col, Tabs } from 'antd';
import Avatar from './components/Avatar';
import UserInfo from './components/UserInfo';
import Permission from './components/Permission';
import Setting from './components/Setting';

const UserInfoPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: <UserInfo />,
    },
    {
      key: '2',
      label: 'Quyền hạn',
      children: <Permission />,
    },
    {
      key: '3',
      label: 'Cài đặt',
      children: <Setting />,
    },
  ];

  return (
    <div className="">
        <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Cập nhật người dùng</h1>
        <div className="flex space-x-2!">
        <Button htmlType="submit">Quay lại</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
        </div>
        </div>

      <Form
        form={form}
        name="user_info"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Avatar form={form} />
          </Col>

          <Col span={16}>
            <Tabs defaultActiveKey="1" items={items} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfoPage;
