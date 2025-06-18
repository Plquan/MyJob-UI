import { Modal, Form, Input, DatePicker, Button, type FormInstance } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import type { ICertificateData } from '../../../../../../../types/resume/ResumeType';

interface ExperienceModalProps {
  open: boolean;
  onSubmit: (value: ICertificateData) => void;
  onCancel: () => void;
  form: FormInstance<ICertificateData>;
}

const ExperienceModal = ({ open, onSubmit, onCancel,form }: ExperienceModalProps) => {
 
  return (
    <Modal
      title="Kinh nghiệm làm việc"
      open={open}
      onCancel={onCancel}
      closeIcon={<CloseOutlined />}
      footer={null}
    >
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <Form.Item
          label="Chức danh/vị trí công việc *"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập chức danh/vị trí công việc!' }]}
        >
          <Input placeholder="Lập trình viên Python" />
        </Form.Item>
        <Form.Item
          label="Tên công ty *"
          name="trainingPlace"
          rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
        >
          <Input placeholder="Công ty TNHH MTV Dịch Vụ AAA" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Ngày bắt đầu *"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker format="DD-MM-YYYY" className="w-full" placeholder="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc *"
            name="expirationDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
          >
            <DatePicker format="DD-MM-YYYY" className="w-full" placeholder="DD-MM-YYYY" />
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