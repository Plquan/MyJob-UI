import React, { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../stores';
import { roleActions } from '../../../../../stores/roleStore/roleReducer';
import type { ICreateRoleData } from '../../../../../types/role/RoleType';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [form] = Form.useForm<ICreateRoleData>()
  const {loading} = useSelector((state: RootState) => state.roleStore);

  const handleSubmit = async () => {
      const values = await form.validateFields()
      dispatch(roleActions.createRole(values))
      form.resetFields();
      onClose();
  }

  return (
    <Modal
      title="Thêm mới"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Thêm"
      centered
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
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

export default AddRoleModal; 