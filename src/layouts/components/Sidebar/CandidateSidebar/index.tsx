import { Menu } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTE_PATH from "../../../../routes/routePath";
import type { MenuProps } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../stores"
import UserAvatar from "./components/avatar"

export default function CandidateSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {currentUser} = useSelector((state: RootState) => state.authStore)

  const menuItems: MenuProps["items"] = [
    {
      key: ROUTE_PATH.CANDIDATE_OVERVIEW,
      icon: <HomeOutlined />,
      label: "Tổng Quan",
    },
    {
      key: ROUTE_PATH.CANDIDATE_PROFILE,
      icon: <FileTextOutlined />,
      label: "Hồ Sơ Của Tôi",
    },
    {
      key: ROUTE_PATH.CANDIDATE_MY_COMPANIES,
      icon: <FileTextOutlined />,
      label: "Công Ty Của Tôi",
    },
    {
      key: "/my-jobs",
      icon: <FileTextOutlined />,
      label: "Việc Làm Của Tôi",
    },
    {
      key: "/notifications",
      icon: <BellOutlined />,
      label: "Thông Báo",
    },
    {
      key: "/account",
      icon: <UserOutlined />,
      label: "Quản Lý Tài Khoản",
    },
  ];

  return (
    <div className="mt-5 top-14 left-0 w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-56px)] flex flex-col z-50">
      <div className="flex flex-col items-center p-4 flex-shrink-0">
        <UserAvatar/>
        <h3 className="font-medium text-center">{currentUser?.fullName}</h3>
      <p className="text-xs text-gray-500">{currentUser?.email}</p>
        <p className="text-xs text-gray-500">0369683675</p>
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Menu với phần scroll riêng */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="-ml-5! font-[13.5px]! border-none!"
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </div>
    </div>
  );
}
