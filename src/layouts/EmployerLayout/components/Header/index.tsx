import { MessageOutlined, UserOutlined, LogoutOutlined, LoadingOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../stores';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { Button, Badge, Dropdown } from 'antd';
import { authActions } from '../../../../stores/authStore/authReducer';

const EmployerHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser, loading } = useSelector((state: RootState) => state.authStore)
  const { unreadCount } = useSelector((state: RootState) => state.chatStore)

  const handleChatClick = () => {
    navigate(ROUTE_PATH.CHAT);
  };

  const logout = async () => {
    try {
      await dispatch(authActions.logout()).unwrap();
      navigate(ROUTE_PATH.EMPLOYER_LOGIN);
    } catch (error) {
      dispatch(authActions.logout());
      navigate(ROUTE_PATH.EMPLOYER_LOGIN);
    }
  }

  const userMenuItems = [
    {
      key: 'logout',
      icon: loading ? <LoadingOutlined spin /> : <LogoutOutlined />,
      label: <span>{loading ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>,
      onClick: logout,
      disabled: loading,
    },
  ];

  return (
    <Header className="h-14 bg-white! border-b border-gray-200! flex items-center justify-between px-6">
      <div className="flex items-center gap-6 ml-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleChatClick}
        >
          <Badge count={unreadCount > 0 ? unreadCount : 0} size="small" overflowCount={99}>
            <MessageOutlined className="text-xl text-white!" />
          </Badge>
          <span className="text-sm">Tin nhắn</span>
        </div>
        {currentUser ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <UserOutlined className="text-xl" />
              <span className="text-sm">{currentUser.email || currentUser.company?.companyName}</span>
            </div>
          </Dropdown>
        ) : (
          <Button
            className='underline'
            onClick={() => navigate(ROUTE_PATH.EMPLOYER_LOGIN)}
          >
            Đăng ký / Đăng nhập
          </Button>
        )}
      </div>
    </Header>
  )
}

export default EmployerHeader