import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Button, Menu } from 'antd';
import { UserOutlined, EditOutlined, SearchOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

const items = [
  {
    key: '/jobs',
    icon: <SearchOutlined />,
    label: <NavLink to="/jobs">Ngành nghề/ Địa điểm</NavLink>,
  },
  {
    key: '/companies',
    icon: <BankOutlined />,
    label: <NavLink to="/companies">Công ty</NavLink>,
  },
  {
    key: '/guide',
    icon: <FileTextOutlined />,
    label: <NavLink to="/guide">Cẩm nang việc làm</NavLink>,
  },
  {
    key: '/cv-samples',
    icon: <FileTextOutlined />,
    label: <NavLink to="/cv-samples">Mẫu CV xin việc</NavLink>,
  },
];


const DefaultHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'login') navigate(ROUTE_PATH.CANDIDATE_LOGIN);
    if (key === 'register') navigate(ROUTE_PATH.CANDIDATE_REGISTER);
  };

  const  DropdownItems = [
    {
      key: 'login',
      label: 'Đăng nhập',
      icon: <UserOutlined />,
    },
    {
      key: 'register',
      label: 'Đăng ký',
      icon: <EditOutlined />,
    },
  ];

  return (
    <Header className=" top-0 left-0 right-0 border border-gray-300 z-50 bg-white! shadow-sm py-3 flex items-center justify-between px-6 z-50">
      {/* Logo bên trái */}
      <div className="flex items-center">
      <div className="flex items-center gap-3">
        <Link to={ROUTE_PATH.HOME}>
          <img 
            src="/assets/vinhuni.png" 
            alt="VINHUNI Logo" 
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </div>

      {/* Thanh menu giữa */}

      <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items} 

      style={{ fontSize: 13.5, marginLeft: 'auto',width: '50%', marginRight: 24, height: '100%', display: 'flex', alignItems: 'center' }}
    />



      {/* Dropdown và Nút nhà tuyển dụng */}
      <div className="flex items-center space-x-6">
        <Dropdown
          menu={{
            items: DropdownItems,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
          arrow
        >
          <div className="flex items-center  text-[13.5px]! text-[#6A5ACD] cursor-pointer">
            <UserOutlined className="mr-2" />
            <div>Đăng ký / Đăng nhập</div>
          </div>
        </Dropdown>

        <Button type="default" onClick={() => navigate(ROUTE_PATH.EMPLOYER_LOGIN)} className="border border-gray-300 flex items-center h-9 px-4">
          <BankOutlined className="mr-2 text-lg" />
          Nhà tuyển dụng
        </Button>
      </div>
    </Header>
  );
};

export default DefaultHeader;
