import React, { useEffect } from "react"
import { Modal, Button, Form, Input, DatePicker, Row, Col } from "antd"
import type { ICertificateData } from "../../../../../../../types/resume/CertificateType"
import { normalizeDate } from "../../../../../../../ultils/functions/normalizeDate"

  interface CertificateModalProps {
    open: boolean
    onCancel: () => void
    onSubmit: (values: ICertificateData) => void
    initialValues?: ICertificateData | null
    form: any
  }

  const CertificateModal: React.FC<CertificateModalProps> = ({ 
    open, 
    onCancel, 
    onSubmit, 
    initialValues,
    form
  }) => {
  
  useEffect(() => {
    if(open){
      if (initialValues?.id) {
        form.setFieldsValue({
          ...initialValues,
          startDate: normalizeDate(initialValues.startDate),
          expirationDate: normalizeDate(initialValues.expirationDate),
        })
      } else {
        form.resetFields()
      }
    }
  }, [open,initialValues, form])

  return (
    <Modal
      title="Chứng chỉ"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered  
     >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên chứng chỉ"
          rules={[{ required: true, message: "Vui lòng nhập tên chứng chỉ" }]}
        >
          <Input placeholder="Chứng Chỉ A" />
        </Form.Item>
        <Form.Item
          name="trainingPlace"
          label="Trường / Trung tâm đào tạo"
          rules={[{ required: true, message: "Vui lòng nhập trường/trung tâm đào tạo" }]}
        >
          <Input placeholder="Trung tâm Đào tạo ABC" />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="01-03-2019" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="expirationDate"
              label={<span>Ngày hết hạn <span className="text-xs text-gray-500">(Để trống nếu chứng chỉ vô thời hạn)</span></span>}
            >
              <DatePicker style={{ width: '100%' }} placeholder="DD-MM-YYYY" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end space-x-2 gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CertificateModal; 