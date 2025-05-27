import { Form, Checkbox, DatePicker, TimePicker, Card } from 'antd';

const Setting = () => {
  return (
    <Card>
      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>
      <Form.Item name="isVerifyEmail" valuePropName="checked">
        <Checkbox>Is verify email</Checkbox>
      </Form.Item>
      <Form.Item label="Last login date" name="lastLoginDate">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Last login time" name="lastLoginTime">
        <TimePicker />
      </Form.Item>
    </Card>
  );
};

export default Setting;
