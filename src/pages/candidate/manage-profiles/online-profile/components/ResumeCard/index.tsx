import { Button, Card, Col, Row, Typography } from "antd"
import { EditOutlined, } from "@ant-design/icons"
import ProfileEditModal from "./components/EditResumeModal"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../../stores"
import { ACADEMICLEVEL_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS, POSITION_OPTIONS, WORKPLACE_OPTIONS } from "../../../../../../constant/selectOptions";
import { getLabelFromValue } from "../../../../../../ultils/functions/getLabelFromValue"
import type { IResumeData } from "../../../../../../types/candidate/ResumeType"
import { candidateActions } from "../../../../../../stores/candidateStore/candidateReducer"
import { formatVND } from "../../../../../../ultils/functions/formatVND"
const { Text } = Typography

const NOT_UPDATE =  <span className="text-gray-400 text-xs italic">Chưa cập nhật</span>
const renderField = (value: any) => !!value ? value : NOT_UPDATE;
const ResumeCard = () => {
    const dispatch  = useDispatch<AppDispatch>()
    const [openEdit, setOpenEdit] = useState(false)
    const { resume } = useSelector((state: RootState) => state.candidateStore)
    const { careers } = useSelector((state: RootState) => state.careerStore)
    const { provinces } = useSelector((state: RootState) => state.provinceStore)
    
  
    const handleFinish = (values: IResumeData) => {
      dispatch(candidateActions.updateOnlineResume(values))
      setOpenEdit(false)
    }
    return (
        <>
        <Card title={"Thông tin chung"} extra = {
          <Button type="default" className="border border-gray-300 flex items-center" onClick={() => setOpenEdit(true)}>
          <EditOutlined className="mr-1" />
          Chỉnh sửa
        </Button> }>
         <div className="mb-10">
            <Text strong>Mục tiêu nghề nghiệp</Text>
            <br />
            {renderField(resume?.description)}
          </div>

          <hr className="my-4 border-gray-100" />

        <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>

          <div className="mb-4">
            <Text strong>Vị trí mong muốn</Text>
            <br />
            {renderField(resume?.title)}
          </div>

          <div className="mb-4">
            <Text strong>Cấp bậc mong muốn</Text>
            <br />
            {renderField(getLabelFromValue(POSITION_OPTIONS,resume?.position))}
          </div>

          <div className="mb-4">
            <Text strong>Trình độ học vấn</Text>
            <br />
            {renderField(getLabelFromValue(ACADEMICLEVEL_OPTIONS,resume?.academicLevel))}
          </div>

          <div className="mb-4">
            <Text strong>Kinh nghiệm</Text>
            <br />
            {renderField(getLabelFromValue(EXPERIENCE_OPTIONS,resume?.academicLevel))}
          </div>

          <div className="mb-4">
            <Text strong>Nghề nghiệp</Text>
            <br />
            {renderField(careers?.find(c => c.id === resume?.careerId)?.name)}
          </div>

        </Col>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Địa điểm làm việc</Text>
            <br />
            {renderField(provinces?.find(p => p.id === resume?.provinceId)?.name)}
          </div>

          <div className="mb-4">
            <Text strong>Mức lương mong muốn</Text>
            <br />
            {renderField(formatVND(resume?.salaryMin))} - {renderField(formatVND(resume?.salaryMax))}
          </div>

          <div className="mb-4">
            <Text strong>Nơi làm việc</Text>
            <br />
            {renderField(getLabelFromValue(WORKPLACE_OPTIONS,resume?.typeOfWorkPlace))}
          </div>

          <div className="mb-0">
            <Text strong>Hình thức làm việc</Text>
            <br />
            {renderField(getLabelFromValue(JOBTYPE_OPTIONS,resume?.academicLevel))}
          </div>

        </Col>
      </Row>
      </Card>
      <ProfileEditModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        initialValues={resume}
        onFinish={handleFinish}
      />
    </>
    )
}

export default ResumeCard