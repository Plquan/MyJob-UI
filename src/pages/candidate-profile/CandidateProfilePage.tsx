import { Button, Col, Row, Modal, Form, Input, Select } from "antd";
import { Switch, Tooltip } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  EditOutlined,
  HomeOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import DefaultHeader from "../../layouts/components/headers/DefaultHeader";
import { useState } from "react";
import ProfileEditModal from "./components/ProfileEditModal";
import ExperienceCard from "./components/ExperienceCard";
import AdvancedSkillCard from "./components/AdvancedSkillCard";

const CandidateProfilePage = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [form] = Form.useForm();
  const initialProfile = {
    position: "Software Engineer",
    level: "Nhân viên",
    education: "Đại học",
    experience: "1 năm kinh nghiệm",
    career: "IT Phần mềm",
    city: "TP.HCM",
    minSalary: "",
    maxSalary: "",
    workplace: "",
    workType: "",
    goal: "",
  };
  const [profile, setProfile] = useState(initialProfile);

  const handleEditFinish = (values: any) => {
    setProfile(values);
    setOpenEdit(false);
  };

  return (
    <>
      <DefaultHeader />
      {/* Main content with fixed sidebar and content */}
      <div className=" min-h-screen flex flex-col md:flex-row bg-white">
        {/* Sidebar navigation (fixed like header) */}

        <div className="mt-5 top-14 rounded-r-md left-0 w-64 bg-white shadow-sm border-r border-gray-200 p-4 h-[calc(100vh-56px)] overflow-y-auto hidden md:block z-40">
          <div className="flex flex-col items-center mb-6 p-4">
            <div className="w-20 h-20 rounded-full bg-red-200 mb-2 overflow-hidden">
              <img
                src="/api/placeholder/80/80"
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-center">Hoang Nguyen Van</h3>
            <p className="text-xs text-gray-500">nvhhoang286@gmail.com</p>
            <p className="text-xs text-gray-500">0369683675</p>
          </div>

          <hr className="my-5 border-gray-200" />

          <Row gutter={[0, 8]}>
            <Col span={24}>
              <div className="flex items-center p-1 hover:bg-blue-50 rounded cursor-pointer text-sm">
                <HomeOutlined className="mr-3 text-gray-500" />
                <span className="text-gray-700">Tổng Quan</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center p-1 bg-blue-50 rounded cursor-pointer text-sm">
                <FileTextOutlined className="mr-3 text-blue-500" />
                <span className="text-blue-500 font-medium">Hồ Sơ Của Tôi</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center p-1 hover:bg-blue-50 rounded cursor-pointer text-sm">
                <FileTextOutlined className="mr-3 text-gray-500" />
                <span className="text-gray-700">Công Ty Của Tôi</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center p-1 hover:bg-blue-50 rounded cursor-pointer text-sm">
                <FileTextOutlined className="mr-3 text-gray-500" />
                <span className="text-gray-700">Việc Làm Của Tôi</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center p-1 hover:bg-blue-50 rounded cursor-pointer text-sm">
                <BellOutlined className="mr-3 text-gray-500" />
                <span className="text-gray-700">Thông Báo Việc Làm</span>
              </div>
            </Col>
            <Col span={24}>
              <div className="flex items-center p-1 hover:bg-blue-50 rounded cursor-pointer text-sm">
                <UserOutlined className="mr-3 text-gray-500" />
                <span className="text-gray-700">Quản Lý Tài Khoản</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="flex-1 p-4 md:p-5 min-w-0">
          <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8 mb-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Phạm Lê Quân</h2>
              <Button type="default" className="border border-gray-300 flex items-center" onClick={() => setOpenEdit(true)}>
                <EditOutlined className="mr-1" />
                Chỉnh sửa
              </Button>
            </div>

            <div className="text-sm space-y-1 mb-6">
              <p>
                <span className="text-gray-500">Vị trí mong muốn: </span>
                <span className=" text-gray-700">FrontEnd Developer</span>
              </p>
              <p>
                <span className="text-gray-500">Kinh nghiệm: </span>
                <span className="text-gray-700">1-3 năm</span>
              </p>
              <p>
                <span className="text-gray-500">Trình độ học vấn: </span>
                <span className="text-gray-700">Mới tốt nghiệp</span>
              </p>
              <p>
                <span className="text-gray-500">Ngành nghề: </span>
                <span className="text-gray-700">UI/UX Designer</span>
              </p>
            </div>

            <div className="bg-gray-100 rounded px-4 py-2 flex items-center w-full">
              <Switch size="default" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Đang bật thông báo việc làm</span>
              <Tooltip title="Bật thông báo để nhận các cơ hội việc làm phù hợp">
                <QuestionCircleOutlined className="ml-2 text-gray-400" />
              </Tooltip>
            </div>
          </div>

          <ExperienceCard />
          <AdvancedSkillCard />


        </div>
      </div>
      <ProfileEditModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        form={form}
        initialValues={profile}
        onFinish={handleEditFinish}
      />
    </>
  );
};
export default CandidateProfilePage;
