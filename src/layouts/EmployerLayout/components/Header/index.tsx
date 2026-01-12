import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../stores';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { Button, Badge } from 'antd';

const EmployerHeader = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: RootState) => state.authStore)
  const { unreadCount } = useSelector((state: RootState) => state.chatStore)

  const handleChatClick = () => {
    navigate(ROUTE_PATH.CHAT);
  };

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
          <div className="flex items-center gap-2">
            <UserOutlined className="text-xl" />
            <span className="text-sm">{currentUser.email || currentUser.company?.companyName}</span>
          </div>
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