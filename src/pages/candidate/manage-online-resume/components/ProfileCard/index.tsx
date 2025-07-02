import React, { useEffect, useState } from 'react'
import { Card, Typography, Row, Col, Button, Form } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import ProfileModal from './components/ProfileModal'
import { GENDER_OPTIONS, MARTIALSTATUS_OPTIONS } from '../../../../../constant/selectOptions'
import type { AppDispatch, RootState } from '../../../../../stores'
import  { candidateActions } from '../../../../../stores/candidateStore/candidateReducer'
import type { ICandidate } from '../../../../../types/candidate/CandidateType'
import  { getLabelFromValue } from '../../../../../ultils/functions/getLabelFromValue'

const { Text } = Typography;

const ProfileCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { candidate,loading } = useSelector((state: RootState) => state.onlineResumeStore);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  
  
  const handleEdit = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleFinish = (values: ICandidate) => {
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
        loading={loading.candidate}
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
              {renderField(getLabelFromValue(GENDER_OPTIONS,candidate?.gender))}
            </div>
            <div className="mb-4">
              <Text strong>Ngày sinh</Text>
              <br />
              {renderField(candidate?.birthday?.toString())}
            </div>
            <div className="mb-0">
              <Text strong>Địa chỉ</Text>
              <br />
              {renderField(candidate?.address)}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="mb-4">
              <Text strong>Tình trạng hôn nhân</Text>
              <br />
              {renderField(getLabelFromValue(MARTIALSTATUS_OPTIONS,candidate?.maritalStatus))}
            </div>
            <div className="mb-4">
              <Text strong>Tỉnh/Thành phố</Text>
              <br />
              {renderField(candidate?.province?.name)}
            </div>
            <div className="mb-4">
              <Text strong>Quận/Huyện</Text>
              <br />
              {renderField(candidate?.district?.name)}
            </div>
 
          </Col>
        </Row>
      </Card>
      <ProfileModal
        open={isModalOpen}
        initialValues={candidate}
        onCancel={handleCancel}
        onFinish={handleFinish}
        form={form}
      />
    </>
  );
};

export default ProfileCard;
