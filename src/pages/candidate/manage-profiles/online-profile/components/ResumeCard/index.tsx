import { Button, Card, Col, Form, Row, Typography } from "antd"
import { EditOutlined, } from "@ant-design/icons";
import ProfileEditModal from "./components/EditResumeModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../stores";
import { ACADEMICLEVEL_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS, POSITION_OPTIONS, WORKPLACE_OPTIONS } from "../../../../../../constant/selectOptions";
import { getLabelFromValue } from "../../../../../../ultils/functions/getLabelFromValue";
const { Text } = Typography;

const NOT_UPDATE =  <span className="text-gray-400 text-xs italic">Chưa cập nhật</span>
const ResumeCard = () => {

    const [openEdit, setOpenEdit] = useState(false)
    const { resume } = useSelector((state: RootState) => state.candidateStore)
    const { careers } = useSelector((state: RootState) => state.careerStore)
    const [form] = Form.useForm();

  
    const handleEditFinish = (values: any) => {
      setOpenEdit(false);
    };
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
            {resume?.description??NOT_UPDATE}
 
          </div>
          <hr className="my-4 border-gray-100" />
        <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Vị trí mong muốn</Text>
            <br />
            {resume?.title??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Cấp bậc mong muốn</Text>
            <br />
            {getLabelFromValue(POSITION_OPTIONS,resume?.position)??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Trình độ học vấn</Text>
            <br />
            {getLabelFromValue(ACADEMICLEVEL_OPTIONS,resume?.academicLevel)??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Kinh nghiệm</Text>
            <br />
            {getLabelFromValue(EXPERIENCE_OPTIONS,resume?.academicLevel)??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Nghề nghiệp</Text>
            <br />
            {careers?.find(c => c.id === resume?.careerId)?.name ?? NOT_UPDATE}
          </div>

        </Col>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Địa điểm làm việc</Text>
            <br />
            {getLabelFromValue(WORKPLACE_OPTIONS,resume?.academicLevel)??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Mức lương mong muốn</Text>
            <br />
            {resume?.salary_min??NOT_UPDATE}
          </div>
          <div className="mb-4">
            <Text strong>Nơi làm việc</Text>
            <br />
            {resume?.typeOfWorkPlace??NOT_UPDATE}
          </div>
          <div className="mb-0">
            <Text strong>Hình thức làm việc</Text>
            <br />
            {getLabelFromValue(JOBTYPE_OPTIONS,resume?.academicLevel)??NOT_UPDATE}
          </div>
        </Col>
      </Row>
      </Card>

      <ProfileEditModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        form={form}
        initialValues={resume}
        onFinish={handleEditFinish}
      />
        </>
    )
}

export default ResumeCard