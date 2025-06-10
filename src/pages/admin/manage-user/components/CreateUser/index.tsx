import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Row,
  Col,
  Card,
} from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../stores';
import { roleActions } from '../../../../../stores/roleStore/roleReducer';
import type { ICreateUser } from '../../../../../types/user/UserType';
import { userActions } from '../../../../../stores/userStore/userReducer';
import LoadingLayout from '../../../../../components/LoadingLayout';
import RoleSelect from '../UserDetail/components/RoleSelect';



const CreateUserPage = () => {
  const [form] = Form.useForm();
  const {loading} = useSelector((state: RootState) => state.userStore);
  const roles = useSelector((state:RootState) => state.roleStore.roles)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(roleActions.getAllRoles());
    }

  }, [dispatch]);

  const onFinish = async (values: ICreateUser) => {
    const data: ICreateUser = {
      fullName: values.fullName,
      email: values.email,
      isActive: values.isActive,
      isVerifyEmail: values.isVerifyEmail,
      isSuperUser: values.isSuperUser,
      isStaff: values.isStaff,
      groupRoles: values.groupRoles,
      roleName: values.roleName,
      password: values.password,
    }
    const result = await dispatch(userActions.createUser(data)).unwrap();
    if (result.success) {
      form.resetFields();
    }
  }

  return (
 <>
    <LoadingLayout loading = {loading}/>
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
                <Col span={14}>
                  <Form.Item
                    label="Họ tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                  >
                    <Input className='w-70!' />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Email không được để trống!' }]}
                  >
                    <Input className='w-70!' />
                  </Form.Item>

                  <Form.Item label="Thay đổi mật khẩu" name="password" 
                  rules={[{ required: true,  message: 'Mật khẩu không được để trống' }]}
                  >
                    <Input.Password className='w-70!'/>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Permissions */}
            <Card title="Quyền hạn" className="mb-3!">
              <Form.Item label="Vai trò" name="roleName" rules={[{ required: true,  message: 'Vai trò không được để trống' }]}>
                <Select placeholder="Chọn vai trò" className='w-50!'>
                  <Select.Option value="CANDIDATE">Ứng viên</Select.Option>
                  <Select.Option value="EMPLOYER">Nhà tuyển dụng</Select.Option>
                  <Select.Option value="ADMIN">Quản trị viên</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Nhóm quyền" name="groupRoles">
                <RoleSelect mode="multiple" placeholder="Chọn nhóm quyền" />
              </Form.Item>

              <Form.Item name="isSuperUser" valuePropName="checked">
                <Checkbox defaultChecked={false}>Toàn quyền truy cập</Checkbox>
              </Form.Item>
              <Form.Item name="isStaff" valuePropName="checked">
                <Checkbox defaultChecked={false}>Nhân viên</Checkbox>
              </Form.Item>
            </Card>

            <Card title="Cài đặt" className="mt-4">
              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox defaultChecked={false}>Active</Checkbox>
              </Form.Item>
              <Form.Item name="isVerifyEmail" valuePropName="checked">
                <Checkbox defaultChecked={false}>Is verify email</Checkbox>
              </Form.Item>           
            </Card>
            <div className="flex items-center gap-2 justify-end mt-4">
            <Button type="primary" htmlType="submit">
              Tạo tài khoản
            </Button>
          </div>
          </Col>
        </Row>
      </Form>
 </>
    
  )
}

export default CreateUserPage;
