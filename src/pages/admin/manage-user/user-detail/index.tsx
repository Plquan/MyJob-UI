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
  Card,
  Empty
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../stores';
import { roleActions } from '../../../../stores/roleStore/roleReducer';


const UserInfoPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const selectedUser = useSelector((state: RootState) => state.userStore.selectedUser);
  const roles = useSelector((state:RootState) => state.roleStore.roles)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(roleActions.getAllRoles());
    }

    if (selectedUser) {
      form.setFieldsValue({
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        active: selectedUser.isActive,
        isVerifyEmail: selectedUser.isVerifyEmail,
        groups: selectedUser.groupRoles,
        isSuperUser: selectedUser.isSuperUser,
        isStaff: selectedUser.isStaff
      });
      setAvatarUrl(selectedUser.avatar || null);
      if (selectedUser.avatar) {
        setFileList([{
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: selectedUser.avatar,
        }]);
      }
    }
    else{
      navigate(ROUTE_PATH.ADMIN_MANAGE_USER)
    }
  }, [selectedUser, form]);

  const handleAvatarChange = (info: any) => {
    console.log('Upload change info:', info);
    const newFileList = info.fileList;
    setFileList(newFileList);
    
    if (newFileList.length > 0) {
      const file = newFileList[0];
      if (file.originFileObj) {
        // Read the new file for preview
        const reader = new FileReader();
        reader.onload = e => {
          setAvatarUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file.originFileObj);
      } else if (file.url) {
        // Use existing file URL for preview
        setAvatarUrl(file.url);
      }
    } else {
      if (selectedUser?.avatar) {
        setAvatarUrl(selectedUser.avatar);
      } else {
        setAvatarUrl(null);
      }
    }
  };

  const onFinish = (values: any) => {
    const data: any = {
      fullName: values.fullName,
      email: values.email,
      active: values.active,
      isVerifyEmail: values.isVerifyEmail,
      isSuperUser: values.isSuperUser,
      isStaff: values.isStaff,
      groups: values.groups,
      password: values.passwordEdit,
    };

    // Handle avatar
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        data.avatar = file.originFileObj;
      } else if (file.url) {
        data.avatar = file.url;
      }
    } else if (selectedUser?.avatar) {
      data.avatar = selectedUser.avatar;
    }

    console.log('data:', data);
    
    // Here you can send the data to your API
    // Example: await axios.post('/api/update-user', data);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
                <div className="w-full h-47 bg-gray-50 flex items-center justify-center rounded mb-4">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
              <Form.Item 
                name="avatar" 
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
              >
                <ImgCrop rotationSlider>
                  <Upload 
                    beforeUpload={() => false}
                    onChange={handleAvatarChange} 
                    maxCount={1}
                    listType="picture"
                    fileList={fileList}
                  >
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
                <Select 
                  mode="multiple" 
                  placeholder="Chọn nhóm quyền"
                  options={roles?.map(role => ({
                    label: role.name,
                    value: role.id
                  })) || []}
                  value={selectedUser?.groupRoles?.map(id => {
                    const role = roles?.find(r => r.id === id);
                    return role ? role.id : null;
                  }).filter(Boolean)}
                />
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
