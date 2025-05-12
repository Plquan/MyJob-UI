import { useNavigate } from 'react-router-dom';
import { Dropdown, Button } from 'antd';
import { UserOutlined, EditOutlined, SearchOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';

const DefaultHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'login') navigate(ROUTE_PATH.CANDIDATE_LOGIN);
    if (key === 'register') navigate(ROUTE_PATH.CANDIDATE_REGISTER);
  };

  const menuItems = [
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3 flex items-center justify-between px-6">
      {/* Logo bên trái */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/vinhuni.png" 
            alt="VINHUNI Logo" 
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Thanh menu giữa */}
      <nav className="h-full flex items-center space-x-8 text-gray-700 text-sm mx-6">
        {[
            { icon: <SearchOutlined className="mr-2" />, label: 'Ngành nghề/ Địa điểm' },
            { icon: <BankOutlined className="mr-2" />, label: 'Công ty' },
            { icon: <FileTextOutlined className="mr-2" />, label: 'Cẩm nang việc làm' },
            { icon: <FileTextOutlined className="mr-2" />, label: 'Mẫu CV xin việc' },
        ].map((item, index) => (
            <div
            key={index}
            className="flex items-center cursor-pointer hover:text-[#6A5ACD] relative after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all after:duration-900"
            >
            {item.icon}
            <span>{item.label}</span>
            </div>
        ))}
        </nav>


      {/* Dropdown và Nút nhà tuyển dụng */}
      <div className="flex items-center space-x-6">
        <Dropdown
          menu={{
            items: menuItems,
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
    </header>
  );
};

export default DefaultHeader;
