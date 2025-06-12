import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfileCard: React.FC = () => {
  return (
    <Card  title={"Thông tin cá nhân"} 
    extra ={
        <Button type="default" className="border border-gray-300 flex items-center">
        <EditOutlined className="mr-1" />
        Chỉnh sửa
      </Button>
    }
    >
      <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Họ và tên</Text>
            <br />
            <Text>Bùi Khánh Huy</Text>
          </div>
          <div className="mb-4">
            <Text strong>Số điện thoại</Text>
            <br />
            <Text>0888425000</Text>
          </div>
          <div className="mb-4">
            <Text strong>Giới tính</Text>
            <br />
            <Text>Nam</Text>
          </div>
          <div className="mb-4">
            <Text strong>Ngày sinh</Text>
            <br />
            <Text>26/02/2001</Text>
          </div>

        </Col>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Tình trạng hôn nhân</Text>
            <br />
            <Text>Độc thân</Text>
          </div>
          <div className="mb-4">
            <Text strong>Tỉnh/Thành phố</Text>
            <br />
            <Text>TP.HCM</Text>
          </div>
          <div className="mb-4">
            <Text strong>Quận/Huyện</Text>
            <br />
            <Text>Bình Tân</Text>
          </div>
          <div className="mb-0">
            <Text strong>Địa chỉ</Text>
            <br />
            <Text>1242 QL1A, Tân Tạo A, Bình Tân, TP. HCM</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileCard;
