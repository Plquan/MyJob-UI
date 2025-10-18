import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { GENDER_OPTIONS, MARTIALSTATUS_OPTIONS } from '../../../../../../constant/selectOptions'
import type { AppDispatch, RootState } from '../../../../../../stores'
import  { provinceActions } from '../../../../../../stores/provinceStore/provinceReducer'
import type { ICandidate } from '../../../../../../types/candidate/CandidateType'
import { normalizeDate } from '../../../../../../ultils/functions/normalizeDate'


const { Option } = Select

interface ProfileModalProps {
  open: boolean
  onCancel: () => void
  onFinish: (values: any) => void
  initialValues?: ICandidate
  form:any
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onCancel,onFinish, initialValues,form }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { provinces, districts, loading, isSubmiting } = useSelector(
    (state: RootState) => state.provinceStore
  )

  useEffect(() => {
    if (initialValues?.provinceId) {
      dispatch(provinceActions.getDistrictsByProvince(initialValues.provinceId));
    }
  }, [initialValues])

  useEffect(() => {
    if(open){
      if (initialValues?.id) {
        form.setFieldsValue({
          ...initialValues,
          provinceId: initialValues.province?.id,
          districtId: initialValues.district?.id,
          birthday: normalizeDate(initialValues.birthday)
        })
      } else {
        form.resetFields()
      }
    }
  }, [open,initialValues, form])

  const onProvinceChange = (provinceId: number) => {
    form.setFieldsValue({
      districtId: undefined
    })
    dispatch(provinceActions.getDistrictsByProvince(provinceId));
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Thông tin cá nhân"
      footer={null}
      width={700}
      loading={loading}
      centered
      getContainer={false}
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish}
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
              {GENDER_OPTIONS.map(opt => (
                  <Option key={opt.value} value={opt.value}>
                  {opt.label}
                  </Option>
              ))}
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
              {MARTIALSTATUS_OPTIONS.map(opt => (
                <Option key={opt.value} value={opt.value}>
                {opt.label}
                </Option>
               ))}
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

export default ProfileModal
