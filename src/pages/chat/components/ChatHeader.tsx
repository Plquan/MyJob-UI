import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@/routes/routePath';

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/assets/vinhuni.png"
          alt="MyJob Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate(ROUTE_PATH.HOME)}
        />
      </div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        type="default"
      >
        Quay lại
      </Button>
    </div>
  );
};

export default ChatHeader;

