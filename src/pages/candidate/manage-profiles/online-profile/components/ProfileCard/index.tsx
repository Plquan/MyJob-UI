import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditProfileModal from './components/EditProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../../stores';
import { mapGender, mapMaritalStatus } from '../../../../../../ultils/functions/mapper';
import type { ICandidateData } from '../../../../../../types/resume/ResumeType';
import { candidateActions } from '../../../../../../stores/candidateStore/candidateReducer';

const { Text } = Typography;

const ProfileCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { candidate } = useSelector((state: RootState) => state.candidateStore);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(candidateActions.getProfile())
  },[dispatch])

  const handleEdit = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleFinish = (values: ICandidateData) => {

    dispatch(candidateActions.updateProfile(values))
    setIsModalOpen(false);
  }

  const NOT_UPDATE =  <span className="text-gray-400 text-xs italic">Chưa cập nhật</span>
  const renderField = (value: any) => !!value ? value : NOT_UPDATE

  return (
    <>
      <Card  title={"Thông tin cá nhân"} 
        extra ={
          <Button type="default" className="border border-gray-300 flex items-center" onClick={handleEdit}>
            <EditOutlined className="mr-1" />
            Chỉnh sửa
          </Button>
        }
      >
        <Row gutter={[32, 16]}>
          <Col xs={24} md={12}>
            <div className="mb-4">
              <Text strong>Số điện thoại</Text>
              <br />
              {candidate?.phone??NOT_UPDATE}
            </div>
            <div className="mb-4">
              <Text strong>Giới tính</Text>
              <br />
              {mapGender(candidate?.gender)??NOT_UPDATE}
            </div>
            <div className="mb-4">
              <Text strong>Ngày sinh</Text>
              <br />
              {candidate?.birthday?.toString()??NOT_UPDATE}
            </div>
            <div className="mb-0">
              <Text strong>Địa chỉ</Text>
              <br />
              {candidate?.address??NOT_UPDATE}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="mb-4">
              <Text strong>Tình trạng hôn nhân</Text>
              <br />
              {mapMaritalStatus(candidate?.maritalStatus)??NOT_UPDATE}
            </div>
            <div className="mb-4">
              <Text strong>Tỉnh/Thành phố</Text>
              <br />
              {candidate?.province?.name??NOT_UPDATE}
            </div>
            <div className="mb-4">
              <Text strong>Quận/Huyện</Text>
              <br />
              {candidate?.district?.name??NOT_UPDATE}
            </div>
 
          </Col>
        </Row>
      </Card>
      <EditProfileModal
        open={isModalOpen}
        initialValues={candidate}
        onCancel={handleCancel}
        onFinish={handleFinish}
      />
    </>
  );
};

export default ProfileCard;
