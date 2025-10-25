import { Spin } from 'antd';

interface LoadingLayoutProps {
  loading: boolean;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ loading }) => {
 
  return <Spin spinning={loading}  fullscreen />;
};

export default LoadingLayout;
