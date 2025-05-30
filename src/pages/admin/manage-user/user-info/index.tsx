import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Upload,
  Row,
  Col,
  Card
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../stores';

const UserInfoPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const selectedUser = useSelector((state: RootState) => state.userStore.selectedUser);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        active: selectedUser.isActive,
        isVerifyEmail: selectedUser.isVerifyEmail,
        avatar: selectedUser.avatar ? [{ url: selectedUser.avatar }] : [],
        groups: selectedUser.groupRoles,
        isSuperUser: selectedUser.isSuperUser,
        isStaff: selectedUser.isStaff
      });
      setAvatarUrl(selectedUser.avatar || null);
    }
    else{
       navigate(ROUTE_PATH.ADMIN_MANAGE_USER)
    }
  }, [selectedUser, form]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleAvatarChange = (info: any) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = e => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Cập nhật người dùng</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
            Lưu và quay lại
          </Button>
          <Button
            onClick={() => navigate(ROUTE_PATH.ADMIN_MANAGE_USER)}
          >
            Quay lại
          </Button>
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
            <Card title="Ảnh đại diện" className="mb-2!">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-auto rounded mb-4" />
              ) : (
                <div className="w-full h-47 bg-gray-100 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-400">No avatar</span>
                </div>
              )}
              <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={e => e && e.fileList}>
                <ImgCrop rotationSlider>
                  <Upload beforeUpload={() => false} onChange={handleAvatarChange} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Card>

            <Card title="Cài đặt" className="mt-4">
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>Active</Checkbox>
              </Form.Item>
              <Form.Item name="isVerifyEmail" valuePropName="checked">
                <Checkbox>Is verify email</Checkbox>
              </Form.Item>           
            </Card>
          </Col>

          <Col span={16}>
            {/* User Info */}
            <Card title="Thông tin người dùng" className="mb-2!">
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: 'Please input full name!' }]}
              >
                <Input className='w-60!' />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Thay đổi mật khẩu" name="passwordEdit">
                <Input.Password />
              </Form.Item>
            </Card>

            {/* Permissions */}
            <Card title="Quyền hạn" className="mt-4">
              <h1>Role name: {selectedUser?.roleName}</h1>
              <Form.Item label="Groups" name="groups">
                <Select mode="multiple" placeholder="Chọn nhóm quyền" />
              </Form.Item>

              <Form.Item name="isSuperUser" valuePropName="checked">
                <Checkbox>Toàn quyền truy cập</Checkbox>
              </Form.Item>
              <Form.Item name="isStaff" valuePropName="checked">
                <Checkbox>Nhân viên</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfoPage;
