import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingLayout from "../../../../components/LoadingLayout";
import ROUTE_PATH from "../../../../routes/routePath";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../stores";
import { authActions } from "../../../../stores/authStore/authReducer";
import { EUserRole } from "../../../../constant/role";


const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false)
  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      await dispatch(authActions.login(values)).unwrap()
       dispatch(authActions.getCurrentUser())
       toast.success("Đăng nhập thành công")
       navigate(ROUTE_PATH.HOME)
    } catch (error:any) {
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
  };

  return (
     <>
    <LoadingLayout loading={loading}/>
    <Form
      form={form}
      layout="vertical"
      name="login"
      onFinish={onFinish}
      initialValues={{
        role: EUserRole.CANDIDATE
      }}
    >
      <Form.Item name="role" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: 'email', message: 'Email không hợp lệ' }
        ]}
      >
        <Input placeholder="Nhập email của bạn" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
        ]}
      >
        <Input.Password
          placeholder="Nhập mật khẩu của bạn"
          iconRender={visible => (visible ? <EyeTwoTone size={18} /> : <EyeInvisibleOutlined size={18} />)}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 18 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-1! h-10 rounded-md bg-[#2196f3] hover:bg-[#64b5f6] border-none text-base font-medium"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default LoginForm;
