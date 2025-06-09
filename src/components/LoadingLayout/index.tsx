import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

interface LoadingLayoutProps {
  loading: boolean;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ loading }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (loading) {
      let ptg = -10;
      const interval = setInterval(() => {
        ptg += 5;
        setPercent(ptg);
        if (ptg > 120) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      setPercent(0);
    }
  }, [loading]);

  return <Spin spinning={loading} percent={percent} fullscreen />;
};

export default LoadingLayout;
