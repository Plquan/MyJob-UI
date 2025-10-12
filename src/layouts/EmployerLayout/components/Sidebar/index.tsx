import { Menu } from 'antd';
import {
  HomeOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  GiftOutlined,
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
    key: 'recruitment',
    label: 'Tuyển dụng',
    icon: <FileTextOutlined />,
    children: [
      {
        key: ROUTE_PATH.EMPLOYER_JOB_POST,
        label: 'Quản lý tin tuyển dụng',
      },
      {
        key: '/dashboard/cv',
        label: 'Quản lý CV',
      },
      {
        key: '/dashboard/candidates',
        label: 'Quản lý ứng viên',
      },
      {
        key: '/dashboard/report',
        label: 'Báo cáo & Thống kê',
      },
    ],
  },
  {
    key: '/dashboard/subscription',
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
    style={{ backgroundColor: 'black' }}
  >
    <div
    className="h-16 flex items-center ml-5 border-b"
    >
    <img
        src="/assets/vinhuni.png"
        className="h-10 object-contain"
    />
    </div>

  
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['recruitment']}
      onClick={({ key }) => navigate(key)}
      items={items}
      style={{
        backgroundColor: 'black',
        color: 'white',
        borderRight: 'none',
        flex: 1,
        width: 256, 
      }}
    />
  </div>
  
  );
}
