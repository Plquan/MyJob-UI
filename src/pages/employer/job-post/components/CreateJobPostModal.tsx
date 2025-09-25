import { useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  DatePicker, 
  Alert,
  Row,
  Col,
  Button
} from 'antd';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface CreateJobPostModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const CreateJobPostModal: React.FC<CreateJobPostModalProps> = ({
  visible,
  onCancel,
  onSubmit
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Tin tuyển dụng"
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Tạo tin
        </Button>,
      ]}
    >
      <Alert
        message="Khi bạn cập nhật bài đăng, nó sẽ ở trạng thái chờ kiểm duyệt!"
        type="warning"
        icon={<ExclamationCircleOutlined />}
        className="mb-4"
      />
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-h-96 overflow-y-auto"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên công việc"
              name="jobTitle"
              rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
            >
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngành nghề"
              name="industry"
              rules={[{ required: true, message: 'Vui lòng chọn ngành nghề!' }]}
            >
              <Select placeholder="Chọn ngành nghề cần tuyển">
                <Select.Option value="IT">Công nghệ thông tin</Select.Option>
                <Select.Option value="FINANCE">Tài chính</Select.Option>
                <Select.Option value="MARKETING">Marketing</Select.Option>
                <Select.Option value="SALES">Bán hàng</Select.Option>
                <Select.Option value="HR">Nhân sự</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Vị trí/chức vụ"
              name="position"
              rules={[{ required: true, message: 'Vui lòng chọn vị trí/chức vụ!' }]}
            >
              <Select placeholder="Chọn vị trí/chức vụ">
                <Select.Option value="DEVELOPER">Lập trình viên</Select.Option>
                <Select.Option value="DESIGNER">Thiết kế</Select.Option>
                <Select.Option value="MANAGER">Quản lý</Select.Option>
                <Select.Option value="ANALYST">Phân tích</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kinh nghiệm"
              name="experience"
              rules={[{ required: true, message: 'Vui lòng chọn kinh nghiệm!' }]}
            >
              <Select placeholder="Chọn kinh nghiệm yêu cầu">
                <Select.Option value="ENTRY">Mới tốt nghiệp</Select.Option>
                <Select.Option value="JUNIOR">Junior (1-2 năm)</Select.Option>
                <Select.Option value="MID">Mid-level (3-5 năm)</Select.Option>
                <Select.Option value="SENIOR">Senior (5+ năm)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nơi làm việc"
              name="workplace"
              rules={[{ required: true, message: 'Vui lòng chọn nơi làm việc!' }]}
            >
              <Select placeholder="Chọn nơi làm việc">
                <Select.Option value="HCM">Hồ Chí Minh</Select.Option>
                <Select.Option value="HN">Hà Nội</Select.Option>
                <Select.Option value="DN">Đà Nẵng</Select.Option>
                <Select.Option value="REMOTE">Làm việc từ xa</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hình thức làm việc"
              name="workType"
              rules={[{ required: true, message: 'Vui lòng chọn hình thức làm việc!' }]}
            >
              <Select placeholder="Chọn hình thức làm việc">
                <Select.Option value="FULL_TIME">Toàn thời gian</Select.Option>
                <Select.Option value="PART_TIME">Bán thời gian</Select.Option>
                <Select.Option value="CONTRACT">Hợp đồng</Select.Option>
                <Select.Option value="INTERNSHIP">Thực tập</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Số lượng tuyển"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng tuyển!' }]}
            >
              <InputNumber 
                placeholder="Nhập số lượng nhân sự cần tuyển" 
                min={1}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Yêu cầu giới tính"
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn yêu cầu giới tính!' }]}
            >
              <Select placeholder="Chọn giới tính yêu cầu">
                <Select.Option value="ANY">Không yêu cầu</Select.Option>
                <Select.Option value="MALE">Nam</Select.Option>
                <Select.Option value="FEMALE">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mức lương tối thiểu"
              name="minSalary"
              rules={[{ required: true, message: 'Vui lòng nhập mức lương tối thiểu!' }]}
            >
              <InputNumber 
                placeholder="Nhập mức lương tối thiểu" 
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mức lương tối đa"
              name="maxSalary"
              rules={[{ required: true, message: 'Vui lòng nhập mức lương tối đa!' }]}
            >
              <InputNumber 
                placeholder="Nhập mức lương tối đa" 
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Bằng cấp"
              name="degree"
              rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}
            >
              <Select placeholder="Chọn bằng cấp">
                <Select.Option value="HIGH_SCHOOL">Trung học phổ thông</Select.Option>
                <Select.Option value="COLLEGE">Cao đẳng</Select.Option>
                <Select.Option value="UNIVERSITY">Đại học</Select.Option>
                <Select.Option value="MASTER">Thạc sĩ</Select.Option>
                <Select.Option value="PHD">Tiến sĩ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hạn nộp hồ sơ"
              name="deadline"
              rules={[{ required: true, message: 'Vui lòng chọn hạn nộp hồ sơ!' }]}
            >
              <DatePicker 
                placeholder="DD-MM-YYYY" 
                format="DD-MM-YYYY"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc!' }]}
        >
          <Input.TextArea 
            rows={6} 
            placeholder="Nhập mô tả chi tiết về công việc, yêu cầu, quyền lợi..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateJobPostModal;
