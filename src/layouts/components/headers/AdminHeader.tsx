import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

export default function AdminHeader() {
  return (
<Header className="h-14 bg-gradient-to-r! from-[rgb(0,0,0)]! to-[rgb(123,104,238)]! flex items-center justify-between px-6 text-white">
  <div className="flex items-center gap-6 ml-auto text-white!">
    <div className="flex items-center gap-2">
      <BellOutlined className="text-xl" />
      <span className="text-sm">Tin nhắn</span>
    </div>
    <div className="flex items-center gap-2">
      <UserOutlined className="text-xl" />
      <span className="text-sm">acerbee@onlinemail.com</span>
    </div>
  </div>
</Header>
  );
} 