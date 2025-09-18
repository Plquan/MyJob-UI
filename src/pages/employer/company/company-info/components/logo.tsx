import React from 'react';
import { Upload, Button, Empty } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { IMyJobFile } from '../../../../../types/myJobFile/myJobFileType';

interface LogoProps {
  logoFile: UploadFile[];
  onLogoUpload: UploadProps['customRequest'];
  logoUrl?: IMyJobFile;
}

const Logo: React.FC<LogoProps> = ({ logoFile, onLogoUpload, logoUrl }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Logo công ty
      </label>
      <div className="w-25 h-25 rounded-lg flex items-center justify-center mb-3 overflow-hidden border-2 border-gray-200">
        {logoUrl ? (
          <img src={logoUrl.url} alt="Company Logo" className="w-full h-full object-cover" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      <ImgCrop
        rotationSlider
        aspect={1}
        modalTitle="Chỉnh sửa ảnh"
        modalOk="Xác nhận"
        modalCancel="Hủy"
      >
        <Upload
          fileList={logoFile}
          customRequest={onLogoUpload}
          maxCount={1}
          showUploadList={false}
          accept="image/*"
        >
          <Button 
            type="primary" 
          >
            Thay logo
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default Logo;
