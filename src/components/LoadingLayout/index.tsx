import React from 'react';
import './styles.css';

interface LoadingLayoutProps {
  show: boolean;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ show }) => {
  return (
    <div className={`loading ${show ? 'show' : 'hide'}`}>
      <div className="loading-box">
        Loading
      </div>
    </div>
  );
};

export default LoadingLayout;
