import { Modal, Form, Input, DatePicker, Button } from 'antd'
import { CloseOutlined } from "@ant-design/icons"
import type { IExperience } from '../../../../../../../types/resume/ExperienceType'
import { useEffect } from 'react'
import { normalizeDate } from '../../../../../../../ultils/functions/normalizeDate'

interface ExperienceModalProps {
  open: boolean
  onSubmit: (value: IExperience) => void
  onCancel: () => void
  initialValues?: IExperience | null
  form: any
}

const ExperienceModal = ({ open, onSubmit, onCancel,form,initialValues }: ExperienceModalProps) => {
   
  useEffect(() => {
    if(open){
      if (initialValues?.id) {
        form.setFieldsValue({
          ...initialValues,
          startDate: normalizeDate(initialValues.startDate),
          endDate: normalizeDate(initialValues.endDate),
        })
      } else {
        form.resetFields()
      }
    }
  }, [open,initialValues, form])

  return (
    <Modal
      title="Kinh nghiệm làm việc"
      open={open}
      onCancel={onCancel}
      closeIcon={<CloseOutlined />}
      footer={null}
    >
      <Form layout="vertical" onFinish={onSubmit} form={form}>

        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item
          label="Chức danh / vị trí công việc"
          name="jobName"
          rules={[{ required: true, message: 'Vui lòng nhập chức danh/vị trí công việc!' }]}
        >
          <Input placeholder="Lập trình viên Python" />
        </Form.Item>
        <Form.Item
          label="Tên công ty"
          name="companyName"
          rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
        >
          <Input placeholder="Công ty TNHH MTV Dịch Vụ AAA" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker format="DD-MM-YYYY" className="w-full" placeholder="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            dependencies={['startDate']}
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
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
        </div>
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
  );
};

export default ExperienceModal; 