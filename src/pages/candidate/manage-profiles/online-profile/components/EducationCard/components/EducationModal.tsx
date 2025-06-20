import { Modal, Form, Input, DatePicker, Button, Row, Col } from 'antd'
import { CloseOutlined } from "@ant-design/icons"
import { useEffect } from 'react'
import { normalizeDate } from '../../../../../../../ultils/functions/normalizeDate'
import type { IEducation } from '../../../../../../../types/resume/EducationType'

interface EducationModalProps {
  open: boolean
  onSubmit: (value: IEducation) => void
  onCancel: () => void
  initialValues?: IEducation | null
  form: any
}

const EducationModal = ({ open, onSubmit, onCancel,form,initialValues }: EducationModalProps) => {
   
  useEffect(() => {
    if(open){
      if (initialValues?.id) {
        form.setFieldsValue({
          ...initialValues,
          startDate: normalizeDate(initialValues.startDate),
          completedDate: normalizeDate(initialValues.completedDate) ,
        })
      } else {
        form.resetFields()
      }
    }
  }, [open,initialValues, form])

  return (
    <Modal
      title="Học vấn"
      open={open}
      onCancel={onCancel}
      closeIcon={<CloseOutlined />}
      footer={null}
      width={650}
      centered
    >
      <Form layout="vertical" onFinish={onSubmit} form={form}>

        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item
          label="Tên bằng cấp/Chứng chỉ"
          name="degreeName"
          rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp/chứng chỉ!' }]}
        >
          <Input placeholder="VD: Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện công nghiệp" />
        </Form.Item>
        <Form.Item
          label="Chuyên ngành đào tạo"
          name="major"
          rules={[{ required: true, message: 'Vui lòng nhập chuyên ngành đào tạo!' }]}
        >
          <Input placeholder="Nhập chuyên ngành đào tạo" />
        </Form.Item>
        <Form.Item
          label="Trường/Trung tâm đào tạo"
          name="trainingPlace"
          rules={[{ required: true, message: 'Vui lòng nhập trường/trung tâm đào tạo!' }]}
        >
          <Input placeholder="Nhập tên trường/Trung tâm đào tạo" />
        </Form.Item>
        
        <Row gutter={16}>
        <Col xs={24} md={12}>
        <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
        <DatePicker format="DD-MM-YYYY" className="w-full" placeholder="DD-MM-YYYY" />
        </Form.Item>
        </Col>
        <Col xs={24} md={12}>
        <Form.Item
        label={<span>Ngày hết hạn <span className="text-xs text-gray-500">(Để trống nếu đang học tại đây)</span></span>}
        name="completedDate"
        dependencies={['startDate']}
          >
        <DatePicker
            format="DD-MM-YYYY"
            className="w-full"
            placeholder="DD-MM-YYYY"
            disabledDate={(current) => {
            const startDate = form.getFieldValue('startDate');
            return startDate && current && current.isBefore(startDate, 'day');
            }}
        />
          </Form.Item>
        </Col>

        </Row>
        <Form.Item
          label="Mô tả thêm"
          name="description"
        >
          <Input.TextArea rows={4} placeholder="Nhập nội dung mô tả tại đây" />
        </Form.Item>

        <div className="flex justify-end mt-6 space-x-2 gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EducationModal; 