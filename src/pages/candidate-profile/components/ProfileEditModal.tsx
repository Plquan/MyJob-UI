import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const ProfileEditModal = ({ open, onCancel, form, initialValues, onFinish }: any) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className="font-sm text-lg">Thông tin hồ sơ</span>}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Form.Item
            name="position"
            label={<span>Vị trí mong muốn</span>}
            rules={[{ required: true, message: "Vui lòng nhập vị trí mong muốn" }]}
          >
            <Input placeholder="Nhập vị trí mong muốn" />
          </Form.Item>
          <Form.Item
            name="level"
            label={<span>Cấp bậc mong muốn</span>}
            rules={[{ required: true, message: "Vui lòng chọn cấp bậc" }]}
          >
            <Select placeholder="Chọn cấp bậc">
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Trưởng nhóm">Trưởng nhóm</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="education"
            label={<span>Trình độ học vấn</span>}
            rules={[{ required: true, message: "Vui lòng chọn trình độ học vấn" }]}
          >
            <Select placeholder="Chọn trình độ học vấn">
              <Option value="Đại học">Đại học</Option>
              <Option value="Cao đẳng">Cao đẳng</Option>
              <Option value="Trung cấp">Trung cấp</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="experience"
            label={<span>Kinh nghiệm làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn kinh nghiệm" }]}
          >
            <Select placeholder="Chọn kinh nghiệm">
              <Option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</Option>
              <Option value="1 năm kinh nghiệm">1 năm kinh nghiệm</Option>
              <Option value="2 năm kinh nghiệm">2 năm kinh nghiệm</Option>
              <Option value="3+ năm kinh nghiệm">3+ năm kinh nghiệm</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="career"
            label={<span>Nghề nghiệp</span>}
            rules={[{ required: true, message: "Vui lòng chọn nghề nghiệp" }]}
          >
            <Select placeholder="Chọn nghề nghiệp">
              <Option value="IT Phần mềm">IT Phần mềm</Option>
              <Option value="Thiết kế">Thiết kế</Option>
              <Option value="Kinh doanh">Kinh doanh</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label={<span>Tỉnh/Thành phố</span>}
            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố">
              <Option value="TP.HCM">TP.HCM</Option>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="minSalary"
            label={<span>Mức lương mong muốn tối thiểu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mức lương tối thiểu" }]}
          >
            <Input addonBefore="VND" placeholder="Nhập mức lương mong muốn tối thiểu" type="number" />
          </Form.Item>
          <Form.Item
            name="maxSalary"
            label={<span>Mức lương mong muốn tối đa</span>}
            rules={[{ required: true, message: "Vui lòng nhập mức lương tối đa" }]}
          >
            <Input addonBefore="VND" placeholder="Nhập mức lương mong muốn tối đa" type="number" />
          </Form.Item>
          <Form.Item
            name="workplace"
            label={<span>Nơi làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn nơi làm việc" }]}
          >
            <Select placeholder="Chọn nơi làm việc">
              <Option value="TP.HCM">TP.HCM</Option>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="workType"
            label={<span>Hình thức làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn hình thức làm việc" }]}
          >
            <Select placeholder="Chọn hình thức làm việc">
              <Option value="Toàn thời gian">Toàn thời gian</Option>
              <Option value="Bán thời gian">Bán thời gian</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="goal"
          label={<span>Mục tiêu nghề nghiệp</span>}
          rules={[{ required: true, message: "Vui lòng nhập mục tiêu nghề nghiệp" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập nội dung tại đây" />
        </Form.Item>
        <div className="flex justify-end mt-6 space-x-2 gap-2">
        <Button className="">Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </div>


      </Form>
    </Modal>
  );
};

export default ProfileEditModal; 