import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../../../stores';
import { provinceActions } from '../../../../../../../stores/provinceStore/provinceReducer';
import { candidateActions } from '../../../../../../../stores/candidateStore/candidateReducer';
import type { ICandidateData } from '../../../../../../../types/candidate/ResumeType';
import dayjs from 'dayjs';

const { Option } = Select;

interface EditProfileModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: ICandidateData;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onCancel, initialValues }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { provinces, districts, loading, isSubmiting } = useSelector(
    (state: RootState) => state.provinceStore
  );
  const [form] = Form.useForm<ICandidateData>();

  useEffect(() => {
    if (initialValues?.provinceId) {
      dispatch(provinceActions.getDistrictsByProvince(initialValues.provinceId));
    }
  }, [initialValues]);

  const onProvinceChange = (provinceId: number) => {
    form.setFieldsValue({
      districtId: undefined
    });
    dispatch(provinceActions.getDistrictsByProvince(provinceId));
  };

  const handleFinish = async (values: ICandidateData) => {
    dispatch(candidateActions.updateProfile(values));
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Thông tin cá nhân"
      footer={null}
      width={700}
      loading={loading}
      centered
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
        initialValues={initialValues ? {
          ...initialValues,
          gender: String(initialValues.gender),
          maritalStatus: String(initialValues.maritalStatus),
          provinceId: initialValues.province?.id,
          districtId: initialValues.district?.id,
          birthday: initialValues.birthday ? dayjs(initialValues.birthday) : undefined
        } : undefined}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
            >
              <Select>
                <Option value="1">Nam</Option>
                <Option value="2">Nữ</Option>
                <Option value="3">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="provinceId"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select loading={loading} onChange={onProvinceChange}>
                {provinces?.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="birthday"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="DD-MM-YYYY" />
            </Form.Item>

            <Form.Item
              name="maritalStatus"
              label="Tình trạng hôn nhân"
              rules={[{ required: true, message: 'Vui lòng chọn tình trạng hôn nhân' }]}
            >
              <Select>
                <Option value="1">Độc thân</Option>
                <Option value="2">Đã kết hôn</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="districtId"
              label="Quận/Huyện"
              rules={[{ required: true, message: 'Vui lòng nhập quận/huyện' }]}
            >
              <Select loading={isSubmiting}>
                {districts?.map((district) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input />
        </Form.Item>

        <div className="flex justify-end mt-6 space-x-2 gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
