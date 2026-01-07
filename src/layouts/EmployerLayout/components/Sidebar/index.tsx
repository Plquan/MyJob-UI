import { Menu } from 'antd';
import {
  HomeOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  GiftOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import ROUTE_PATH from '../../../../routes/routePath';


const items: MenuProps['items'] = [
  {
    key: ROUTE_PATH.EMPLOYER_DASHBOARD,
    label: 'Tổng quan',
    icon: <HomeOutlined />,
  },
  {
    key: ROUTE_PATH.EMPLOYER_COMPANY,
    label: 'Quản lý công ty',
    icon: <ApartmentOutlined />,
  },
  {
    key: 'manage-jobpost',
    label: 'Quản lý tin tuyển dụng',
    icon: <FileTextOutlined />,
    children: [
      {
        key: ROUTE_PATH.EMPLOYER_JOB_POST,
        label: 'Danh sách tin đăng',
      },
    ],
  },
  {
    key: 'recruitment',
    label: 'Quản lý ứng viên',
    icon: <UserOutlined />,
    children: [

      {
        key: ROUTE_PATH.EMPLOYER_MANAGE_RESUME,
        label: 'Hồ sơ ứng tuyển',
      },
      {
        key: ROUTE_PATH.EMPLOYER_FIND_CANDIDATE,
        label: 'Tìm ứng viên mới',
      },
    ],
  },
  {
    key: ROUTE_PATH.EMPLOYER_MANAGE_PACKAGE,
    label: 'Gói dịch vụ',
    icon: <GiftOutlined />,
  },
];

export default function CompanySidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'white' }}
    >
      <div
        className="h-16 flex items-center ml-5"
      >
        <img
          src="/assets/vinhuni.png"
          className="h-10 object-contain"
        />
      </div>


      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['recruitment']}
        onClick={({ key }) => navigate(key)}
        items={items}
        style={{
          backgroundColor: 'white',
          color: 'white',
          borderRight: '',
          flex: 1,
          width: 256,
        }}
      />
    </div>

  );
}
