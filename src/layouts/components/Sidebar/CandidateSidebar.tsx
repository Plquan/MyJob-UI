import { Menu, Avatar } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../../routes/routePath";

export default function CandidateSidebar() {
  const navigate = useNavigate();

  return (
    <div className="mt-5 top-14 left-0 w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-56px)] flex flex-col z-40">
      {/* Avatar + Info */}
      <div className="flex flex-col items-center mb-6 p-4 flex-shrink-0">
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

      <hr className="border-gray-200 mb-4" />

      {/* Menu với phần scroll riêng */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          defaultSelectedKeys={["/profile"]}
          style={{ border: "none", fontSize: 13.5 }}
          onClick={({ key }) => navigate(key)}
        >
          <Menu.Item key={ROUTE_PATH.CANDIDATE_OVERVIEW} icon={<HomeOutlined />}>
            Tổng Quan
          </Menu.Item>

          <Menu.Item
            key={ROUTE_PATH.CANDIDATE_PROFILE}
            icon={<FileTextOutlined />}
            style={{ color: "#2c53da", fontWeight: 500 }}
          >
            Hồ Sơ Của Tôi
          </Menu.Item>

          <Menu.Item key="/my-company" icon={<FileTextOutlined />}>
            Công Ty Của Tôi
          </Menu.Item>

          <Menu.Item key="/my-jobs" icon={<FileTextOutlined />}>
            Việc Làm Của Tôi
          </Menu.Item>

          <Menu.Item key="/notifications" icon={<BellOutlined />}>
            Thông Báo Việc Làm
          </Menu.Item>

          <Menu.Item key="/account" icon={<UserOutlined />}>
            Quản Lý Tài Khoản
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}
