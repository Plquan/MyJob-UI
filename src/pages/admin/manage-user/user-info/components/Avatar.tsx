import { useState } from 'react';
import { Form, Button, Upload, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

interface AvatarProps {
  form: any;
}

const Avatar = ({ form }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleAvatarChange = (info: any) => {
    const file = info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card title="Ảnh đại diện">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar Preview" className="w-full h-auto rounded mb-4" />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded mb-4">
          <span className="text-gray-400">No avatar</span>
        </div>
      )}
      <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={e => e && e.fileList}>
        <ImgCrop rotationSlider>
          <Upload beforeUpload={() => false} onChange={handleAvatarChange} maxCount={1}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </ImgCrop>
      </Form.Item>
    </Card>
  );
};

export default Avatar;
