import { Col, Row } from "antd";
import {
    FileTextOutlined,
    UserOutlined,
    HomeOutlined,
    BellOutlined,
  } from "@ant-design/icons";
export default function CandidateSidebar() { 

    return (
        <div className="mt-5 top-14 rounded-r-md left-0 w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-56px)] overflow-y-auto hidden md:block z-40">
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
    )

}
