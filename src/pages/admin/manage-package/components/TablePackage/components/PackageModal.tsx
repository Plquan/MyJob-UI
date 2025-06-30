import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, InputNumber, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../stores';
import { packageActions } from '../../../../../../stores/packageStore/packageReducer';
import type { IPackage } from '../../../../../../types/package/PackageType';

const { TextArea } = Input;
const { Option } = Select;

interface AddPackageModalProps {
  open: boolean;
  onCancel: () => void
  onFinish: (data: IPackage) => void
  form: any
  isEdit?: boolean
}

const PackageModal: React.FC<AddPackageModalProps> = ({
  open,
  onCancel,
  onFinish,
  form,
  isEdit = false
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
      title={isEdit ? "Chỉnh sửa gói" : "Thêm gói mới"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

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
          <Select placeholder="Chọn loại gói..." disabled={isEdit}>
            {packageTypes?.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Giá (VND)"
          name="price"
          rules={[
            { required: true, message: 'Vui lòng nhập giá gói!' },
          ]}
        >
          <InputNumber 
            placeholder="Nhập giá gói..." 
            style={{ width: '100%' }}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Thời hạn (ngày)"
          name="durationInDays"
          rules={[
            { type: 'number', min: 1, message: 'Thời hạn phải lớn hơn 0!' }
          ]}
        >
          <InputNumber 
            placeholder="Nhập thời hạn (để trống nếu không giới hạn)..." 
            style={{ width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch/>
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

          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isSubmiting}
            >
              {isEdit ? "Cập nhật" : "Thêm gói"}
            </Button>
          </div>
      </Form>
    </Modal>
  );
};

export default PackageModal; 