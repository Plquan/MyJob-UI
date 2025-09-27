import { useState } from 'react';
import { Spin, Upload, Modal } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../stores';
import { companyActions } from '../../../../stores/companyStore/companyReducer';

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const CompanyMediaPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companyImages, submitting } = useSelector((state: RootState) => state.companyStore);

  const [imageFiles, setImageFiles] = useState<UploadFile[]>(
    (companyImages && companyImages.length > 0)
      ? companyImages.map((img, index) => ({
          uid: String(img.id),
          name: `ảnh-${index + 1}`,
          status: 'done',
          url: img.url,
        }))
      : []
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleUploadImages = async (files: UploadFile[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      if (file.originFileObj) {
        formData.append('files', file.originFileObj);
      }
    });
    await dispatch(companyActions.uploadCompanyImages(formData));
  };

  const handleDeleteImage = async (file: UploadFile) => {
    await dispatch(companyActions.deleteCompanyImage(Number(file.uid)));
    return true;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}> Tải lên</div>
    </button>
  );

  return (
    <Spin spinning={submitting.images}>
      <Upload
        listType="picture-card"
        multiple
        accept="image/*"
        fileList={imageFiles}
        beforeUpload={() => false}
        onChange={({ fileList }) => {
          setImageFiles(fileList);
          handleUploadImages(fileList);
        }}
        onPreview={handlePreview} 
        onRemove={handleDeleteImage}
      >
        {uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
        closeIcon={<CloseOutlined style={{ fontSize: 20, color: '#666' }}/> }
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Spin>
  );
};

export default CompanyMediaPage;
