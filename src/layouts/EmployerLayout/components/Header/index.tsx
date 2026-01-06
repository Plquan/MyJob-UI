import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../stores';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../routes/routePath';
import { Button } from 'antd';

const EmployerHeader = () =>  {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state: RootState) => state.authStore)
  return (
    <Header className="h-14 bg-black flex items-center justify-between px-6 text-white">
      <div className="flex items-center gap-6 ml-auto text-white!">
        <div className="flex items-center gap-2">
          <MessageOutlined className="text-xl" />
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