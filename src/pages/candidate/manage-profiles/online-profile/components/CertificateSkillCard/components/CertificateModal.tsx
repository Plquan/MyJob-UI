import React from "react";
import { Modal, Button, Form, Input, DatePicker, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";

interface CertificateModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ open, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold">Chứng chỉ</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="certificateName"
          label={<span>Tên chứng chỉ <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: "Vui lòng nhập tên chứng chỉ" }]}
        >
          <Input placeholder="Chứng Chỉ A" />
        </Form.Item>
        <Form.Item
          name="organization"
          label={<span>Trường/Trung tâm đào tạo <span className="text-red-500">*</span></span>}
          rules={[{ required: true, message: "Vui lòng nhập trường/trung tâm đào tạo" }]}
        >
          <Input placeholder="Trung tâm Đào tạo ABC" />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="startDate"
              label={<span>Ngày bắt đầu <span className="text-red-500">*</span></span>}
              rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="01-03-2019" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="endDate"
              label={<span>Ngày hết hạn <span className="text-xs text-gray-500">(Để trống nếu chứng chỉ vô thời hạn)</span></span>}
            >
              <DatePicker style={{ width: '100%' }} placeholder="DD-MM-YYYY" format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center mt-4">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{ background: '#6C3483', borderColor: '#6C3483' }}
            className="px-8"
          >
            LƯU
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CertificateModal; 