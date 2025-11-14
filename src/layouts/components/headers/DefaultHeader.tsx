import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Button, Menu, Avatar } from 'antd';
import { UserOutlined, EditOutlined, SearchOutlined, BankOutlined, FileTextOutlined, HomeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ROUTE_PATH from '../../../routes/routePath';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import type { RootState } from '../../../stores';
import { useSelector } from 'react-redux';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { useTranslation } from '../../../provider/Languages';
import authService from '../../../services/authService';
import { EUserRole } from '../../../constant/role';


const DefaultHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'login') navigate(ROUTE_PATH.CANDIDATE_LOGIN);
    if (key === 'register') navigate(ROUTE_PATH.CANDIDATE_REGISTER);
  };

  const items = [
    {
      key: '/jobs',
      icon: <SearchOutlined />,
      label: <NavLink to="/jobs">{t('header.jobSearch')}</NavLink>,
    },
    {
      key: '/companies',
      icon: <BankOutlined />,
      label: <NavLink to="/companies">{t('header.companySearch')}</NavLink>,
    },
    {
      key: '/guide',
      icon: <FileTextOutlined />,
      label: <NavLink to="/guide">{t('header.guideSearch')}</NavLink>,
    },
    {
      key: '/cv-samples',
      icon: <FileTextOutlined />,
      label: <NavLink to="/cv-samples">{t('header.cvSearch')}</NavLink>,
    },
  ];


  const DropdownItems = [
    {
      key: 'login',
      label: t('header.login'),
      icon: <UserOutlined />,
    },
    {
      key: 'register',
      label: t('header.register'),
      icon: <EditOutlined />,
    },
  ];

  const logout = async () => {
    await authService.logout();
    navigate(ROUTE_PATH.CANDIDATE_LOGIN);
  }
  const getLabelRole = (role: EUserRole | undefined): string => {
    switch (role) {
      case EUserRole.CANDIDATE:
        return t('header.profile');
      case EUserRole.EMPLOYER:
        return t('header.dashboard');
      case EUserRole.ADMIN:
        return t('header.dashboard');
      default:
        return "...";
    }
  };
  const getPathRole = (role: EUserRole | undefined): any => {
    switch (role) {
      case EUserRole.CANDIDATE:
        return ROUTE_PATH.CANDIDATE_OVERVIEW;
      case EUserRole.EMPLOYER:
        return ROUTE_PATH.EMPLOYER_DASHBOARD;
      case EUserRole.ADMIN:
        return ROUTE_PATH.ADMIN_DASHBOARD;
    }
  };
  const getIconRole = (role: EUserRole | undefined): React.ReactNode => {
    switch (role) {
      case EUserRole.CANDIDATE:
        return <UserOutlined />;
      case EUserRole.EMPLOYER:
        return <HomeOutlined />;
      case EUserRole.ADMIN:
        return <HomeOutlined />;
    }
  };

  const loggedInMenu = [
    {
      key: 'profile',
      icon: getIconRole(currentUser?.roleName),
      label: <span>{getLabelRole(currentUser?.roleName)}</span>,
      onClick: () => navigate(getPathRole(currentUser?.roleName)),
    },
    {
      key: 'logout',
      icon: <ArrowRightOutlined />,
      label: <span>{t('header.logout')}</span>,
      onClick: logout,
    },
  ];

  return (
    <Header className="fixed top-0 left-0 right-0 border border-gray-200 z-50 bg-white! shadow-sm py-3 flex items-center justify-between px-4!">
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
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}

        style={{ fontSize: 14, marginLeft: 'auto', width: '50%', marginRight: 24, height: '100%', display: 'flex', alignItems: 'center' }}
      />

      <div className="flex items-center space-x-6">
        {currentUser ? (
          <Dropdown
            menu={{ items: loggedInMenu }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center text-[13.5px] cursor-pointer">
              <Avatar size="small" src={currentUser.avatar} className="mr-2!" />
              <span className="max-w-[120px] truncate">{currentUser.fullName}</span>
            </div>
          </Dropdown>
        ) : (
          <Dropdown
            menu={{
              items: DropdownItems,
              onClick: handleMenuClick,
            }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center max-w-[150px] sm:max-w-none text-[13.5px] text-[#6A5ACD] cursor-pointer truncate whitespace-nowrap">
              <UserOutlined className="mr-2 text-[16px]" />
              <span className="truncate">{t('header.register')}/{t('header.login')}</span>
            </div>
          </Dropdown>
        )}

        <Button
          type="default"
          onClick={() => navigate(ROUTE_PATH.PRODUCTS)}
          icon={<BankOutlined />}
          className="flex items-center mr-3!"
        >
          {t('header.employer')}
        </Button>
        <LanguageSwitcher />
      </div>
    </Header>
  );
};

export default DefaultHeader;
