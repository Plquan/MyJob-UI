import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Row, Col, DatePicker } from 'antd'
import { useSelector } from 'react-redux'
import { GENDER_OPTIONS, MARTIALSTATUS_OPTIONS } from '../../../../../../constant/selectOptions'
import type { RootState } from '../../../../../../stores'
import type { ICandidate } from '../../../../../../types/candidate/CandidateType'
import { normalizeDate } from '../../../../../../ultils/functions/normalizeDate'


const { Option } = Select

interface CandidateModalProps {
  open: boolean
  onCancel: () => void
  onFinish: (values: any) => void
  initialValues?: ICandidate
  form: any
}

const CandidateModal: React.FC<CandidateModalProps> = ({ open, onCancel, onFinish, initialValues, form }) => {
  const { provinces, loading } = useSelector(
    (state: RootState) => state.provinceStore
  )

  useEffect(() => {
    if (open) {
      if (initialValues?.id) {
        form.setFieldsValue({
          ...initialValues,
          provinceId: initialValues.provinceId,
          birthday: normalizeDate(initialValues.birthday)
        })
      } else {
        form.resetFields()
      }
    }
  }, [open, initialValues, form])

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
              name="fullName"
              label="Họ tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input />
            </Form.Item>

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
              name="provinceId"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select loading={loading}>
                {provinces?.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
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

export default CandidateModal
