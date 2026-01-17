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
    key: ROUTE_PATH.ADMIN_DASHBOARD,
    label: 'Tổng quan',
    icon: <HomeOutlined />,
  },
  {
    key: ROUTE_PATH.ADMIN_MANAGE_USER,
    label: 'Quản lý người dùng',
    icon: <ApartmentOutlined />,
  },
  {
    key: ROUTE_PATH.ADMIN_MANAGE_JOB_POST,
    label: 'Quản lí tin tuyển dụng',
    icon: <FileTextOutlined />,
  },
  {
    key: 'recruitment',
    label: 'Quản lí chung',
    icon: <FileTextOutlined />,
    children: [
      {
        key: ROUTE_PATH.ADMIN_MANAGE_CAREER,
        label: 'Quản lý ngành nghề',
      },
      {
        key: ROUTE_PATH.ADMIN_MANAGE_PROVINCE,
        label: 'Quản lý tỉnh thành',
      },
    ],
  },
  {
    key: ROUTE_PATH.ADMIN_MANAGE_PACKAGE,
    label: 'Quản lí gói dịch vụ',
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
