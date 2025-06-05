import { Button, Upload, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { authActions } from "../../../../../stores/authStore/authReducer";
import { useState } from "react";

interface AvatarProps {
  onDeleteImage: () => void;
}

export default function Avatar({ onDeleteImage }: AvatarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading } = useSelector((state: RootState) => state.authStore);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = async (options:any) => {
    const { file } = options;
    var formData = new FormData();
    formData.append('file', file);
    dispatch(authActions.updateAvatar(formData));
  };

  return (
    <>
      <div className="relative w-20 h-20 rounded-full bg-gray-200 mb-2 overflow-hidden">
        <img
          key={currentUser?.avatar}
          src={currentUser?.avatar}
          alt="Profile avatar"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <ImgCrop
          modalTitle="Cắt ảnh"
          modalOk="Xác nhận"
          modalCancel="Hủy"
          aspect={1}
          showReset
          rotationSlider 
          zoomSlider
        >
          <Upload showUploadList={false} customRequest={handleUpload}>
            <Button
              type="text"
              icon={<EditOutlined />}
              loading={loading}
              className="flex items-center justify-center"
            />
          </Upload>
        </ImgCrop>

        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={onDeleteImage}
          loading={loading}
          className="flex items-center justify-center"
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        destroyOnHidden 
        width="auto"
        className="avatar-modal"
        style={{ padding: 0, background: 'transparent' }}
      >
        <img
          src={currentUser?.avatar}
          alt="Profile avatar"
          className="max-h-[80vh] max-w-[80vw] object-contain"
        />
      </Modal>
    </>
  );
}
