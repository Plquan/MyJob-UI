import { Menu } from 'antd';
import {
  HomeOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import ROUTE_PATH from '../../../routes/routePath';

const items: MenuProps['items'] = [
  {
    key: ROUTE_PATH.EMPLOYER_DASHBOARD,
    label: 'Tổng quan',
    icon: <HomeOutlined />,
  },
  {
    key: '/dashboard/company',
    label: 'Quản lý công ty',
    icon: <ApartmentOutlined />,
  },
  {
    key: 'recruitment',
    label: 'Tuyển dụng',
    icon: <FileTextOutlined />,
    children: [
      {
        key: '/dashboard/jobs',
        label: 'Quản lý tin tuyển dụng',
        icon: <FileTextOutlined />,
      },
      {
        key: '/dashboard/cv',
        label: 'Quản lý CV',
        icon: <FileTextOutlined />,
      },
      {
        key: '/dashboard/candidates',
        label: 'Quản lý ứng viên',
        icon: <UserOutlined />,
      },
      {
        key: '/dashboard/report',
        label: 'Báo cáo & Thống kê',
        icon: <BarChartOutlined />,
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
    <aside
    className="min-h-screen flex flex-col"
    style={{ width: 256, backgroundColor: '#0a1931' }} // 256px = mặc định của Ant Design Menu
  >
    <div
    className="h-16 flex items-center justify-center border-b border-[#11224d]"
    >
    <img
        src="assets/vinhuni.png"
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
        backgroundColor: '#0a1931',
        color: 'white',
        borderRight: 'none',
        flex: 1,
        width: 256, // cố định chiều ngang
      }}
    />
  </aside>
  
  );
}
