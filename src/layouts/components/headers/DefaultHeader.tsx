import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Button } from 'antd';
import { UserOutlined, EditOutlined, SearchOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

const menuItems = [
  { icon: <SearchOutlined className="mr-2" />, label: 'Ngành nghề/ Địa điểm', path: '/jobs' },
  { icon: <BankOutlined className="mr-2" />, label: 'Công ty', path: '/companies' },
  { icon: <FileTextOutlined className="mr-2" />, label: 'Cẩm nang việc làm', path: '/guide' },
  { icon: <FileTextOutlined className="mr-2" />, label: 'Mẫu CV xin việc', path: '/cv-samples' },
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
    <Header className=" top-0 left-0 right-0 z-50 bg-white! shadow-sm py-3 flex items-center justify-between px-6 z-50">
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

      <nav className="h-full flex items-center space-x-8 text-[13.5px] mx-6">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center cursor-pointer relative
             hover:text-[#6A5ACD]
             after:content-['']
             after:absolute after:bottom-0 after:left-0 after:h-[2px]
             after:bg-blue-400 after:transition-all after:duration-300
             ${isActive ? 'after:w-full text-[#6A5ACD]' : 'after:w-0'}`
          }
        >
          {item.icon}
          <span className="text-black ml-1">{item.label}</span>
        </NavLink>
      ))}
    </nav>



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
          <div className="flex items-center text-sm text-[#6A5ACD] cursor-pointer">
            <UserOutlined className="mr-2" />
            <span>Đăng ký / Đăng nhập</span>
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
