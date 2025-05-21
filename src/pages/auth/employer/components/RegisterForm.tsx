import { Form, Input, Button, Select, DatePicker, Col, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import ROUTE_PATH from '../../../../routes/routePath';
import authService from '../../../../services/authService';
import type { ICompanyRegisterRequestData } from '../../../../types/auth/AuthType';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../stores';
import { toast } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { provinces } = useSelector((state: RootState) => state.provinceStore);
  const [form] = Form.useForm<ICompanyRegisterRequestData>();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = async () => {
    try {
      await form.validateFields(['fullname', 'email', 'password', 'confirmPassword']);
      setStep(2);
    } catch (error) {
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const data = form.getFieldsValue();
      console.log(data);
      const response = await authService.companyRegister(data);
       if(response.success){
        toast.success('Đăng ký thành công!');
        navigate(ROUTE_PATH.EMPLOYER_LOGIN);
       }

    } catch (error:any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex flex-1 items-center justify-center "}>
      <div className="w-full max-w-[540px] bg-white">
        <h2 className="text-center text-3xl font-bold mb-8 mt-6" style={{ color: '#222' }}>
          Đăng ký
        </h2>

        <div className="flex items-center justify-between mb-5 px-2">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2
              ${step === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <span className='font-sans text-[15px] text-[#1f1f1f]'>Liên lạc</span>
          </div>

          <div className={`h-px mx-4 flex-1 transition-all duration-300 rounded
            ${step === 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />

          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2
              ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className='font-sans text-[15px] text-[#1f1f1f]'>Công ty</span>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          name="register"
          onFinish={handleRegister}
        >
          {/* Step 1 fields */}
          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input placeholder="Nhập họ và tên" className="rounded-md h-8 text-base" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
            >
              <Input placeholder="Nhập email" className="rounded-md h-8 text-base" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="rounded-md h-8 text-base"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                className="rounded-md h-8 text-base"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end">
                <Button type="primary" onClick={handleNext}>
                  Tiếp tục
                </Button>
              </div>
            </Form.Item>
          </div>

          {/* Step 2 fields */}
          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <Form.Item
              name= {["companyInfo", "companyName"]}
              label="Tên công ty"
              rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
            >
              <Input placeholder="Nhập tên công ty" />
            </Form.Item>

            <Form.Item
              name= {["companyInfo", "companyEmail"]}
              label="Email công ty"
              rules={[{ required: true, message: 'Vui lòng nhập số hotline!' }]}
            >
              <Input placeholder="Nhập số hotline của công ty" />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item
                name= {["companyInfo", "companyPhone"]}
                label="Hotline công ty"
                className="flex-1"
                rules={[{ required: true, message: 'Vui lòng nhập số liên lạc!' }]}
              >
                <Input placeholder="Nhập số liên lạc" className="rounded-md h-8 text-base" />
              </Form.Item>
              <Form.Item
                name= {["companyInfo", "taxCode"]}
                label="Mã số thuế"
                className="flex-1"
                rules={[{ required: true, message: 'Mã số thuế là bắt buộc!' }]}
              >
                <Input placeholder="Nhập mã số thuế" className="rounded-md h-8 text-base" />
              </Form.Item>
            </div>

            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name= {["companyInfo", "fieldOperation"]}
                  label="Lĩnh vực hoạt động"
                  rules={[{ required: true, message: 'Vui lòng chọn lĩnh vực!' }]}
                >
                  <Input placeholder="Nhập tên lĩnh vực" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name= {["companyInfo", "since"]}
                  label="Ngày thành lập"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="DD-MM-YYYY" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Địa chỉ công ty" required>
              <Form.Item
                name= {["companyInfo", "provinceId"]}
                noStyle
                rules={[{ required: true, message: 'Chọn tỉnh/thành phố!' }]}
              >
                <Select placeholder="Tỉnh/Thành phố" style={{ width: '35%' }}>
                {provinces?.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name= {["companyInfo", "address"]}
                rules={[{ required: true, message: 'Nhập địa chỉ chi tiết!' }]}
                style={{ marginTop: 8, marginBottom: 0 }}
              >
                <Input placeholder="Số nhà, phường/xã" />
              </Form.Item>
            </Form.Item>

            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Quay lại</Button>
              <Button type="primary" htmlType="submit">Hoàn tất</Button>
            </div>
          </div>
        </Form>

        <div className="text-center text-sm mt-7 mb-2">
          Bạn đã có tài khoản?{' '}
          <a href={ROUTE_PATH.EMPLOYER_LOGIN} className="text-blue-600 hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

