import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { IUpdateRoleData } from '../../../../../types/role/RoleType';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../stores';
import { roleActions } from '../../../../../stores/roleStore/roleReducer';



interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleData: IUpdateRoleData | null;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  roleData 
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [form] = Form.useForm<IUpdateRoleData>()
  const {loading} = useSelector((state: RootState) => state.roleStore);

  useEffect(() => {
    if (roleData) {
      form.setFieldsValue({
        name: roleData.name,
        description: roleData.description
      });
    }
  }, [roleData, form]);

  const handleSubmit = async () => {
      const values = await form.validateFields();
      if (roleData) {
        const updateRoleData = {
          id: roleData.id,
          name: values.name,
          description: values.description
        }
        dispatch(roleActions.updateRole(updateRoleData))
        form.resetFields();
        onClose();
      }
  }

  return (
    <Modal
      title="Cập nhật"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={roleData || {}}
      >
        <Form.Item
          name="name"
          label="Tên vai trò"
          rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
        >
          <Input placeholder="Nhập tên vai trò" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea placeholder="Nhập mô tả vai trò" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRoleModal; 