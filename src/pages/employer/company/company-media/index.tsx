import { useState } from 'react';
import { Spin, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../stores';
import { companyActions } from '../../../../stores/companyStore/companyReducer';

const CompanyMediaPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companyImages ,loading} = useSelector((state: RootState) => state.companyStore);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>(
    (companyImages && companyImages.length > 0)
      ? companyImages.map((img, index) => ({
        uid: String(img.id ?? index),
        name: `ảnh-${index + 1}`,
        status: 'done',
        url: img.url,
      }))
      : []
  );

  const handleUploadImages = async (files: UploadFile[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      if (file.originFileObj) {
        formData.append('files', file.originFileObj);
      }
    });
    await dispatch(companyActions.uploadCompanyImages(formData));
  };


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}> Tải lên</div>
    </button>
  );
  return (
    <Spin spinning={loading}>
       <Upload
      listType="picture-card"
      multiple
      accept="image/*"
      fileList={imageFiles}
      beforeUpload={() => false}
      onChange={({ fileList }) => {      
        handleUploadImages(fileList);    
      }}
    >
      {uploadButton}
    </Upload>
    </Spin>
  )
}

export default CompanyMediaPage