import { MessageOutlined, UserOutlined, LogoutOutlined, LoadingOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../stores';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { Dropdown } from 'antd';
import { authActions } from '../../../../stores/authStore/authReducer';

export default function AdminHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser, loading } = useSelector((state: RootState) => state.authStore)

  const logout = async () => {
    try {
      await dispatch(authActions.logout()).unwrap();
      navigate(ROUTE_PATH.ADMIN_LOGIN);
    } catch (error) {
      dispatch(authActions.logout());
      navigate(ROUTE_PATH.ADMIN_LOGIN);
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
    <Header className="h-14 bg-gradient-to-r! from-[rgb(0,0,0)]! to-[rgb(123,104,238)]! flex items-center justify-between px-6 text-white">
      <div className="flex items-center gap-6 ml-auto text-white!">
        <div className="flex items-center gap-2">
          <MessageOutlined className="text-xl" />
          <span className="text-sm">Tin nhắn</span>
        </div>
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <UserOutlined className="text-xl" />
            <span className="text-sm">{currentUser?.email || 'acerbee@onlinemail.com'}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
} 