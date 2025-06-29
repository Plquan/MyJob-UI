import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../stores';
import { packageActions } from '../../../../../../stores/packageStore/packageReducer';
import type { IUpdatePackage } from '../../../../../../types/package/PackageType';

const { TextArea } = Input;
const { Option } = Select;

interface AddPackageModalProps {
  open: boolean;
  onCancel: () => void
  onFinish: (data: IUpdatePackage) => void
  form: any
}

const AddPackageModal: React.FC<AddPackageModalProps> = ({
  open,
  onCancel,
  onFinish,
  form
  ,
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const { packageTypes, isSubmiting } = useSelector((state: RootState) => state.packageStore);

  useEffect(() => {
    if (open) {
      dispatch(packageActions.getAllPackageTypes());
    }
  }, [open, dispatch]);



  return (
    <Modal
      title="Thêm gói mới"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên gói"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên gói!' },
            { min: 2, message: 'Tên gói phải có ít nhất 2 ký tự!' }
          ]}
        >
          <Input placeholder="Nhập tên gói..." />
        </Form.Item>

        <Form.Item
          label="Loại gói"
          name="packageTypeId"
          rules={[
            { required: true, message: 'Vui lòng chọn loại gói!' }
          ]}
        >
          <Select placeholder="Chọn loại gói...">
            {packageTypes?.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập mô tả gói (không bắt buộc)..."
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isSubmiting}
            >
              Thêm gói
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPackageModal; 