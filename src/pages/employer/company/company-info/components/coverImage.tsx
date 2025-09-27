import React from 'react';
import { Upload, Button, Empty } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { IMyJobFile } from '../../../../../types/myJobFile/myJobFileType';


interface CoverImageProps {
  coverImageFile: UploadFile[];
  onCoverImageUpload: UploadProps['customRequest'];
  coverImageUrl?: IMyJobFile;
  submitting: boolean
}

const CoverImage: React.FC<CoverImageProps> = ({ coverImageFile, onCoverImageUpload, coverImageUrl,submitting }) => {

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ảnh bìa hiện tại
      </label>
      <div className="w-full max-w-md">
        <div className="w-full h-32 rounded-lg mb-3 overflow-hidden border-2 border-gray-200">
          {coverImageUrl ? (
            <img src={coverImageUrl.url} alt="Company Banner" className="w-full h-full object-cover " />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
        <ImgCrop
          rotationSlider
          aspect={16/9}
          modalTitle="Chỉnh sửa ảnh"
          modalOk="Xác nhận"
          modalCancel="Hủy"
        >
          <Upload
            fileList={coverImageFile}
            customRequest={onCoverImageUpload}
            maxCount={1}
            showUploadList={false}
            accept="image/*"
          >
            <Button 
              type="primary" 
              loading={submitting}
            >
              Thay ảnh bìa
            </Button>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default CoverImage;
