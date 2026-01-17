import { Menu, Badge } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BellOutlined,
  AuditOutlined,
  IdcardOutlined,
  MessageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTE_PATH from "../../../../routes/routePath";
import type { MenuProps } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../stores"
import UserAvatar from "./components/userAvatar"
import AllowSearchToggle from "./components/AllowSearchToggle";
import { BookmarkIcon } from "@/assets/icon/bookmark";

export default function CandidateSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const {currentUser} = useSelector((state: RootState) => state.authStore)
  const { unreadCount } = useSelector((state: RootState) => state.chatStore)

  const menuItems: MenuProps["items"] = [
    {
      key: ROUTE_PATH.CANDIDATE_OVERVIEW,
      icon: <HomeOutlined />,
      label: "Tổng Quan",
    },
    {
      key: ROUTE_PATH.CANDIDATE_ONLINE_RESUME,
      icon: <IdcardOutlined />,
      label: "Hồ sơ của tôi",
    },
    {
      key: ROUTE_PATH.CANDIDATE_PROFILE,
      icon: <AuditOutlined />,
      label: "Quản lí cv",
    },
    {
      key: ROUTE_PATH.CANDIDATE_MY_APPLIED_JOBS,
      icon: <FileTextOutlined />,
      label: "Công việc của tôi",
    },
    {
      key: ROUTE_PATH.CANDIDATE_MY_COMPANIES,
      icon: <BookmarkIcon className="w-4 h-4"/>,
      label: "Danh sách đã lưu",
    },
    {
      key: ROUTE_PATH.CANDIDATE_NOTIFICATIONS,
      icon: <BellOutlined />,
      label: "Thông báo",
    },
    {
      key: "/account",
      icon: <UserOutlined />,
      label: "Quản Lý Tài Khoản",
    },
  ];

  return (
    <div className="fixed mt-5 top-14 left-0 w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-56px)] flex flex-col z-50">
      <div className="flex flex-col items-center p-4 flex-shrink-0">
        <UserAvatar/>
        <h3 className="font-medium text-center">{currentUser?.candidate?.fullName}</h3>
      <p className="text-xs text-gray-500">{currentUser?.email}</p>
      <div className="bg-gray-50 rounded-lg">
          <AllowSearchToggle />
        </div>
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
