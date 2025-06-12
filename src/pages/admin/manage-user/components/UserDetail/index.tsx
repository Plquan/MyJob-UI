import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  Modal,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { roleActions } from '../../../../../stores/roleStore/roleReducer';
import type { RootState, AppDispatch } from '../../../../../stores';
import { userActions } from '../../../../../stores/userStore/userReducer';
import type { IUpdateUser } from '../../../../../types/user/UserType';
import RoleSelect from './components/RoleSelect';
import { mapRole } from '../../../../../ultils/functions/mapper';



const UserDetailPage = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const selectedUser = useSelector((state: RootState) => state.userStore.selectedUser);
  const roles = useSelector((state:RootState) => state.roleStore.roles)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(roleActions.getAllRoles());
    }

    if (!selectedUser) {
      dispatch(userActions.setCurrentTab('1'));
      return; // sớm return không gọi form.setFieldsValue
    }
  
    form.setFieldsValue({
      fullName: selectedUser.fullName,
      email: selectedUser.email,
      isActive: selectedUser.isActive,
      isVerifyEmail: selectedUser.isVerifyEmail,
      groupRoles: selectedUser.groupRoles,
      isSuperUser: selectedUser.isSuperUser,
      isStaff: selectedUser.isStaff
    });
    setAvatarUrl(selectedUser.avatar || null);   
  
  }, [selectedUser, form]);


  const onFinish = (values: IUpdateUser) => {
    const data: IUpdateUser = {
      id: selectedUser!.id,
      fullName: values.fullName,
      email: values.email,
      isActive: values.isActive,
      isVerifyEmail: values.isVerifyEmail,
      isSuperUser: values.isSuperUser,
      isStaff: values.isStaff,
      groupRoles: values.groupRoles,
      password: values.password,
    }
    dispatch(userActions.updateUser(data))
  };


  const handleDelete = () => {
    if (selectedUser) {
      dispatch(userActions.deleteUser(selectedUser.id));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={24}>
            {/* User Info */}
            <Card title="Thông tin người dùng" className="mb-3! mt-4!">
              <Row gutter={24}>
                <Col span={7} className="border-r border-gray-200 pr-6 mr-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-35 h-35 mt-15 bg-gray-100  rounded-full overflow-hidden">
                      {avatarUrl ? (
                        <img 
                          src={avatarUrl} 
                          alt="avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center ">
                             <img 
                              src="/assets/avatar.png" 
                              alt="avatar" 
                              className="w-full h-full object-cover"
                            />
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <Form.Item
                    label="Họ tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input full name!' }]}
                  >
                    <Input className='w-full!' />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="Thay đổi mật khẩu" name="password">
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Permissions */}
            <Card title="Quyền hạn" className="mb-3!">

              <Form.Item>
              <span className="text-medium pb-4 font-medium text-gray-600 mr-2">Vai trò: {mapRole(selectedUser!.roleName)}</span>
              </Form.Item>

              <Form.Item label="Nhóm quyền" name="groupRoles">
                <RoleSelect 
                  mode="multiple" 
                  placeholder="Chọn nhóm quyền"
                  value={selectedUser?.groupRoles}
                />
              </Form.Item>

              <Form.Item name="isSuperUser" valuePropName="checked">
                <Checkbox>Toàn quyền truy cập</Checkbox>
              </Form.Item>
              <Form.Item name="isStaff" valuePropName="checked">
                <Checkbox>Nhân viên</Checkbox>
              </Form.Item>
            </Card>

            <Card title="Cài đặt" className="mt-4">
              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Active</Checkbox>
              </Form.Item>
              <Form.Item name="isVerifyEmail" valuePropName="checked">
                <Checkbox>Is verify email</Checkbox>
              </Form.Item>           
            </Card>
            <div className="flex items-center justify-between mt-4">
              <Button 
                type="primary" 
                danger
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Xóa
              </Button>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </div>

          
          </Col>
        </Row>
      </Form>

      <Modal
        title="Xác nhận xóa"
        centered
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </>
  )
}

export default UserDetailPage;
