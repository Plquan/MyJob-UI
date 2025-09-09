import React from 'react';
import { Button, Input, Select, DatePicker, Form, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface CompanyInfoFormData {
  companyName: string;
  taxCode: string;
  employeeCount: string;
  establishedDate: string;
  businessType: string;
  website: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  email: string;
  phone: string;
  province: string;
  district: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
}

const CompanyInfoForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: CompanyInfoFormData) => {
    console.log('Form values:', values);
    message.success('Thông tin công ty đã được cập nhật!');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        companyName: 'GSI GROUP LIMITED',
        taxCode: '08888999111',
        employeeCount: '500-1000',
        businessType: 'Gia công phần mềm',
        website: 'https://www.topcv.vn/cong-ty/gsi-group-limited/www.gsi-group.asia',
        facebook: 'http://www.facebook.com/sharer/sharer.php?u=https://www.topcv.vn/cong-ty/g',
        linkedin: 'https://www.linkedin.com/cws/share?url=https://www.topcv.vn/cong-ty/gsi-grou',
        email: '195105002@huy@ou.edu.vn',
        phone: '0888999111',
        province: 'ho-chi-minh',
        district: 'binh-thanh',
        address: '153 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh',
        latitude: '10.806910467000023',
        longitude: '106.71957105500007',
      }}
    >
      <div className="mb-6">
        <Form.Item
          name="companyName"
          label={<span className="text-sm font-medium text-gray-700">Tên công ty</span>}
          rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
        >
          <Input placeholder="Nhập tên công ty" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Form.Item
            name="taxCode"
            label={<span className="text-sm font-medium text-gray-700">Mã số thuế</span>}
            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
          >
            <Input placeholder="Nhập mã số thuế" />
          </Form.Item>

          <Form.Item
            name="businessType"
            label={<span className="text-sm font-medium text-gray-700">Lĩnh vực hoạt động</span>}
            rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực hoạt động' }]}
          >
            <Input placeholder="Nhập lĩnh vực hoạt động" />
          </Form.Item>

          <Form.Item
            name="website"
            label={<span className="text-sm font-medium text-gray-700">Đường dẫn website</span>}
          >
            <Input placeholder="https://" />
          </Form.Item>

          <Form.Item
            name="facebook"
            label={<span className="text-sm font-medium text-gray-700">Đường dẫn Facebook</span>}
          >
            <Input placeholder="https://facebook.com/" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="text-sm font-medium text-gray-700">Email công ty</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập email công ty' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="195105002@huy@ou.edu.vn" />
          </Form.Item>
          <Form.Item
            name="province"
            label={<span className="text-sm font-medium text-gray-700">Tỉnh/Thành phố</span>}
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
          >
            <Select placeholder="TP.HCM">
              <Option value="ho-chi-minh">TP.HCM</Option>
              <Option value="ha-noi">Hà Nội</Option>
              <Option value="da-nang">Đà Nẵng</Option>
              <Option value="can-tho">Cần Thơ</Option>
              <Option value="hai-phong">Hải Phòng</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="space-y-4">
          <Form.Item
            name="employeeCount"
            label={<span className="text-sm font-medium text-gray-700">Quy mô công ty</span>}
            rules={[{ required: true, message: 'Vui lòng chọn quy mô công ty' }]}
          >
            <Select placeholder="Chọn quy mô công ty">
              <Option value="1-10">1-10 nhân viên</Option>
              <Option value="11-50">11-50 nhân viên</Option>
              <Option value="51-200">51-200 nhân viên</Option>
              <Option value="201-500">201-500 nhân viên</Option>
              <Option value="500-1000">500-1000 nhân viên</Option>
              <Option value="1000+">Trên 1000 nhân viên</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="establishedDate"
            label={<span className="text-sm font-medium text-gray-700">Ngày thành lập công ty</span>}
          >
            <DatePicker
              className="w-full "
              placeholder="DD-MM-YYYY"
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <Form.Item
            name="youtube"
            label={<span className="text-sm font-medium text-gray-700">Đường dẫn Youtube</span>}
          >
            <Input placeholder="Nhập URL Youtube" />
          </Form.Item>

          <Form.Item
            name="linkedin"
            label={<span className="text-sm font-medium text-gray-700">Đường dẫn Linkedin</span>}
          >
            <Input placeholder="https://www.linkedin.com/" />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span className="text-sm font-medium text-gray-700">Số điện thoại</span>}
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder="0888999111" />
          </Form.Item>

          <Form.Item
            name="district"
            label={<span className="text-sm font-medium text-gray-700">Quận/Huyện</span>}
            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
          >
            <Select placeholder="Bình Thạnh">
              <Option value="binh-thanh">Bình Thạnh</Option>
              <Option value="quan-1">Quận 1</Option>
              <Option value="quan-3">Quận 3</Option>
              <Option value="quan-7">Quận 7</Option>
              <Option value="thu-duc">Thủ Đức</Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      <Form.Item
        name="address"
        label={<span className="text-sm font-medium text-gray-700">Địa chỉ</span>}
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="153 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh" />
      </Form.Item>

      <Form.Item
        name="description"
        label={<span className="text-sm font-medium text-gray-700">Mô tả công ty</span>}
      >
        <TextArea
          rows={6}
          placeholder="Nhập mô tả về công ty..."
          className="resize-none"
        />
      </Form.Item>


      <Button
        type="primary"
        htmlType="submit"
        icon={<SaveOutlined />}
      >
        Cập nhật
      </Button>
    </Form>
  );
};

export default CompanyInfoForm;
