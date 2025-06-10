import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateRole: (roleData: { id: string; name: string; description: string }) => void;
  roleData: Role | null;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateRole,
  roleData 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (roleData) {
      form.setFieldsValue({
        name: roleData.name,
        description: roleData.description
      });
    }
  }, [roleData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (roleData) {
        onUpdateRole({
          id: roleData.id,
          name: values.name,
          description: values.description
        });
        form.resetFields();
        onClose();
      }
    } catch (error) {
      message.error('Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <Modal
      title="Sửa Vai Trò"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
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