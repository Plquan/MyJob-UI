import { Form, Select, Checkbox, Card } from 'antd';

const Permission = () => {
  return (
    <Card>
      <h1>Role name: admin</h1>

      <Form.Item label="Groups" name="groups">
        <Select mode="multiple" placeholder="Select groups" />
      </Form.Item>

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Toàn quyền truy cập</Checkbox>
      </Form.Item>
      <Form.Item name="isVerifyEmail" valuePropName="checked">
        <Checkbox>Nhân viên</Checkbox>
      </Form.Item>
    </Card>
  );
};

export default Permission;
