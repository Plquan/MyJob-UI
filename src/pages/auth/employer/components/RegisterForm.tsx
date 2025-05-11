import { Form, Input, Button, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const RegisterForm = ({ mounted }: { mounted: boolean }) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const slideRegister = mounted ? 'translate-y-0 opacity-100 transition-all duration-600 ease-out' : 'translate-y-80 opacity-0';

  return (
    <div className={"flex flex-1 items-center justify-center " + slideRegister}>
      <div className="w-full max-w-[540px] bg-white ">
        <h2 className="text-center text-3xl font-bold mb-8 mt-6" style={{ color: '#222' }}>Đăng ký</h2>
        
      {/* Stepper */}
        <div className="flex items-center justify-between mb-5 px-2">
        {/* Step 1 */}
        <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2
            ${step === 1 ? 'bg-blue-100 text-blue-600' : 'bg-blue-100 text-blue-600'}`}>
            <CheckOutlined style={{ fontSize: 12 }} />
            </div>
            <span className="text-sm">Liên lạc</span>
        </div>

        {/* Đường kẻ */}
        <div className={`h-px mx-4 flex-1 transition-all duration-300 rounded 
            ${step === 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />

        {/* Step 2 */}
        <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2
            ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
            </div>
            <span className="text-sm">Công ty</span>
        </div>
        </div>



        {/* Bước 1: Liên lạc */}
        {step === 1 && (
          <Form
            form={form}
            layout="vertical"
            name="register-employer"
            onFinish={() => setStep(2)}
          >
            <Form.Item
              name="fullname"
              label={<span><span className="text-red-500 mr-1"></span>Họ và tên</span>}
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              style={{ marginBottom: 15 }}
            >
              <Input placeholder="Nhập họ và tên" className="rounded-md h-8 text-base" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span><span className="text-red-500 mr-1"></span>Email</span>}
              rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
              style={{ marginBottom: 18 }}
            >
              <Input placeholder="Nhập email" className="rounded-md h-8 text-base" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span><span className="text-red-500 mr-1"></span>Mật khẩu</span>}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              style={{ marginBottom: 18 }}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="rounded-md h-8 text-base"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={<span><span className="text-red-500 mr-1"></span>Nhập lại mật khẩu</span>}
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Mật khẩu không khớp!');
                  },
                }),
              ]}
              style={{ marginBottom: 18 }}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                className="rounded-md mb-5 h-8 text-base"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item>
                <div className="flex justify-end">
                    <Button type="primary" htmlType="submit">Tiếp tục</Button>
                </div>
                </Form.Item>
          </Form>
        )}

        {/* Bước 2: Công ty */}
        {step === 2 && (
          <Form
            layout="vertical"
            name="register-company"
            onFinish={() => { /* Xử lý hoàn tất đăng ký ở đây */ }}
          >
            <Form.Item
              name="companyName"
              label={<span><span className="text-red-500 mr-1"></span>Tên công ty</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
            >
              <Input placeholder="Nhập tên công ty" />
            </Form.Item>
            <Form.Item
              name="companyHotline"
              label={<span><span className="text-red-500 mr-1"></span>Email công ty</span>}
              rules={[{ required: true, message: 'Vui lòng nhập số hotline!' }]}
            >
              <Input placeholder="Nhập số hotline của công ty" />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item
                name="firstName"
                label={<span><span className="text-red-500 mr-1"></span>Hotline công ty</span>}
                className="flex-1"
                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
              >
                <Input placeholder="Nhập tên" className="rounded-md h-8 text-base" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={<span><span className="text-red-500 mr-1"></span>Mã số thuế</span>}
                className="flex-1"
                rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
              >
                <Input placeholder="Nhập họ" className="rounded-md h-8 text-base" />
              </Form.Item>
            </div>
            <Form.Item
              name="companyField"
              label={<span><span className="text-red-500 mr-1">*</span>Lĩnh vực</span>}
              rules={[{ required: true, message: 'Vui lòng chọn lĩnh vực!' }]}
            >
              <Select placeholder="Chọn lĩnh vực">
                <Option value="it">Công nghệ thông tin</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="finance">Tài chính</Option>
                {/* Thêm các lĩnh vực khác nếu cần */}
              </Select>
            </Form.Item>
            <Form.Item
              label={<span><span className="text-red-500 mr-1">*</span>Địa chỉ công ty</span>}
              required
            >
                <Form.Item
                  name="companyProvince"
                  noStyle
                  rules={[{ required: true, message: 'Chọn tỉnh/thành phố!' }]}
                >
                  <Select placeholder="Tỉnh/Thành phố" style={{ width: '35%' }}>
                    <Option value="hanoi">Hà Nội</Option>
                    <Option value="hcm">Hồ Chí Minh</Option>
                  </Select>
                </Form.Item>
              <Form.Item
                name="companyAddress"
                rules={[{ required: true, message: 'Nhập địa chỉ chi tiết!' }]}
                style={{ marginTop: 8 }}
              >
                <Input placeholder="Số nhà, phường/xã" />
              </Form.Item>
            </Form.Item>
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Quay lại</Button>
              <Button type="primary" htmlType="submit">Hoàn tất</Button>
            </div>
          </Form>
        )}

        <div className="text-center text-sm mt-7 mb-2">
          Bạn đã có tài khoản? <a href="#" className="text-blue-600  hover:underline">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
