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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
      width={700}
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Alert
        message="Khi bạn cập nhật bài đăng, nó sẽ ở trạng thái chờ kiểm duyệt!"
        type="warning"
        icon={<ExclamationCircleOutlined />}
        className="mb-4!"
      />
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
      >
        <Row gutter={16} align="top">
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

        <Row gutter={16} align="top">
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

        <Row gutter={16} align="top">
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
                style={{ width: '100%' }}
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

        <Row gutter={16} align="top">
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
                className="w-full!"
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
                className="w-full!"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
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
                style={{ height: '32px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ description: data });
              }}
              config={{
                placeholder: 'Nhập mô tả chi tiết về công việc, yêu cầu, quyền lợi...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Yêu cầu công việc"
          name="requirements"
          rules={[{ required: true, message: 'Vui lòng nhập yêu cầu công việc!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ requirements: data });
              }}
              config={{
                placeholder: 'Nhập yêu cầu công việc, kỹ năng, kinh nghiệm...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Quyền lợi"
          name="benefits"
          rules={[{ required: true, message: 'Vui lòng nhập quyền lợi!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ benefits: data });
              }}
              config={{
                placeholder: 'Nhập quyền lợi, chế độ đãi ngộ cho ứng viên...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Tỉnh/Thành phố"
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
            >
              <Select placeholder="Chọn tỉnh thành phố">
                <Select.Option value="HCM">Hồ Chí Minh</Select.Option>
                <Select.Option value="HN">Hà Nội</Select.Option>
                <Select.Option value="DN">Đà Nẵng</Select.Option>
                <Select.Option value="HP">Hải Phòng</Select.Option>
                <Select.Option value="CT">Cần Thơ</Select.Option>
                <Select.Option value="BD">Bình Dương</Select.Option>
                <Select.Option value="AG">An Giang</Select.Option>
                <Select.Option value="BR">Bà Rịa - Vũng Tàu</Select.Option>
                <Select.Option value="BL">Bạc Liêu</Select.Option>
                <Select.Option value="BK">Bắc Kạn</Select.Option>
                <Select.Option value="BG">Bắc Giang</Select.Option>
                <Select.Option value="BN">Bắc Ninh</Select.Option>
                <Select.Option value="BT">Bến Tre</Select.Option>
                <Select.Option value="BĐ">Bình Định</Select.Option>
                <Select.Option value="BP">Bình Phước</Select.Option>
                <Select.Option value="BT">Bình Thuận</Select.Option>
                <Select.Option value="CM">Cà Mau</Select.Option>
                <Select.Option value="CB">Cao Bằng</Select.Option>
                <Select.Option value="DL">Đắk Lắk</Select.Option>
                <Select.Option value="DN">Đắk Nông</Select.Option>
                <Select.Option value="DB">Điện Biên</Select.Option>
                <Select.Option value="ĐT">Đồng Tháp</Select.Option>
                <Select.Option value="GL">Gia Lai</Select.Option>
                <Select.Option value="HG">Hà Giang</Select.Option>
                <Select.Option value="HN">Hà Nam</Select.Option>
                <Select.Option value="HT">Hà Tĩnh</Select.Option>
                <Select.Option value="HD">Hải Dương</Select.Option>
                <Select.Option value="HB">Hòa Bình</Select.Option>
                <Select.Option value="HY">Hưng Yên</Select.Option>
                <Select.Option value="KH">Khánh Hòa</Select.Option>
                <Select.Option value="KG">Kiên Giang</Select.Option>
                <Select.Option value="KT">Kon Tum</Select.Option>
                <Select.Option value="LC">Lai Châu</Select.Option>
                <Select.Option value="LD">Lâm Đồng</Select.Option>
                <Select.Option value="LS">Lạng Sơn</Select.Option>
                <Select.Option value="LC">Lào Cai</Select.Option>
                <Select.Option value="LĐ">Long An</Select.Option>
                <Select.Option value="ND">Nam Định</Select.Option>
                <Select.Option value="NA">Nghệ An</Select.Option>
                <Select.Option value="NB">Ninh Bình</Select.Option>
                <Select.Option value="NT">Ninh Thuận</Select.Option>
                <Select.Option value="PT">Phú Thọ</Select.Option>
                <Select.Option value="PY">Phú Yên</Select.Option>
                <Select.Option value="QB">Quảng Bình</Select.Option>
                <Select.Option value="QN">Quảng Nam</Select.Option>
                <Select.Option value="QG">Quảng Ngãi</Select.Option>
                <Select.Option value="QN">Quảng Ninh</Select.Option>
                <Select.Option value="QT">Quảng Trị</Select.Option>
                <Select.Option value="ST">Sóc Trăng</Select.Option>
                <Select.Option value="SL">Sơn La</Select.Option>
                <Select.Option value="TN">Tây Ninh</Select.Option>
                <Select.Option value="TB">Thái Bình</Select.Option>
                <Select.Option value="TN">Thái Nguyên</Select.Option>
                <Select.Option value="TH">Thanh Hóa</Select.Option>
                <Select.Option value="TT">Thừa Thiên Huế</Select.Option>
                <Select.Option value="TG">Tiền Giang</Select.Option>
                <Select.Option value="TV">Trà Vinh</Select.Option>
                <Select.Option value="TQ">Tuyên Quang</Select.Option>
                <Select.Option value="VL">Vĩnh Long</Select.Option>
                <Select.Option value="VP">Vĩnh Phúc</Select.Option>
                <Select.Option value="YB">Yên Bái</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quận/Huyện"
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
            >
              <Select placeholder="Chọn Quận/Huyện">
                <Select.Option value="Q1">Quận 1</Select.Option>
                <Select.Option value="Q2">Quận 2</Select.Option>
                <Select.Option value="Q3">Quận 3</Select.Option>
                <Select.Option value="Q4">Quận 4</Select.Option>
                <Select.Option value="Q5">Quận 5</Select.Option>
                <Select.Option value="Q6">Quận 6</Select.Option>
                <Select.Option value="Q7">Quận 7</Select.Option>
                <Select.Option value="Q8">Quận 8</Select.Option>
                <Select.Option value="Q9">Quận 9</Select.Option>
                <Select.Option value="Q10">Quận 10</Select.Option>
                <Select.Option value="Q11">Quận 11</Select.Option>
                <Select.Option value="Q12">Quận 12</Select.Option>
                <Select.Option value="TB">Thủ Đức</Select.Option>
                <Select.Option value="GV">Gò Vấp</Select.Option>
                <Select.Option value="BT">Bình Thạnh</Select.Option>
                <Select.Option value="TD">Tân Bình</Select.Option>
                <Select.Option value="TB">Tân Phú</Select.Option>
                <Select.Option value="PN">Phú Nhuận</Select.Option>
                <Select.Option value="BT">Bình Tân</Select.Option>
                <Select.Option value="HM">Hóc Môn</Select.Option>
                <Select.Option value="CC">Củ Chi</Select.Option>
                <Select.Option value="HB">Huyện Bình Chánh</Select.Option>
                <Select.Option value="NC">Nhà Bè</Select.Option>
                <Select.Option value="CB">Cần Giờ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>


        <Form.Item
          label="Tên người liên hệ"
          name="contactName"
          rules={[{ required: true, message: 'Vui lòng nhập tên người liên hệ!' }]}
        >
          <Input placeholder="Nhập tên người liên hệ" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại người liên hệ"
          name="contactPhone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9+\-\s()]+$/, message: 'Số điện thoại không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập số điện thoại người liên hệ" />
        </Form.Item>

        <Form.Item
          label="Email người liên hệ"
          name="contactEmail"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email người liên hệ" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateJobPostModal;
