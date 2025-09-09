import React from 'react';
import { Upload, Button } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

interface LogoProps {
  logoFile: UploadFile[];
  onLogoUpload: UploadProps['onChange'];
}

const Logo: React.FC<LogoProps> = ({ logoFile, onLogoUpload }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Logo công ty
      </label>
      <div className="w-25 h-25 bg-black rounded-lg flex items-center justify-center mb-3">
        <span className="text-white text-xl font-bold">GSI</span>
      </div>
      <Upload
        fileList={logoFile}
        onChange={onLogoUpload}
        beforeUpload={() => false}
        maxCount={1}
        showUploadList={false}
      >
        <Button 
          type="primary" 
        >
          Thay logo
        </Button>
      </Upload>
    </div>
  );
};

export default Logo;
