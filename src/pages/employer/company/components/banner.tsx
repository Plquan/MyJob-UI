import React from 'react';
import { Upload, Button } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

interface BannerProps {
  bannerFile: UploadFile[];
  onBannerUpload: UploadProps['onChange'];
}

const Banner: React.FC<BannerProps> = ({ bannerFile, onBannerUpload }) => {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ảnh bìa hiện tại
      </label>
      <div className="w-full max-w-md">
        <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3"></div>
        <Upload
          fileList={bannerFile}
          onChange={onBannerUpload}
          beforeUpload={() => false}
          maxCount={1}
          showUploadList={false}
        >
          <Button 
            type="primary" 
          >
            Thay ảnh bìa
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default Banner;
