import { Button, Card, Col, Form, Row, Typography } from "antd"
import { EditOutlined, } from "@ant-design/icons";
import ProfileEditModal from "./components/ProfileEditModal";
import { useState } from "react";
const { Text } = Typography;
const GeneralInfoCard = () => {

    const [openEdit, setOpenEdit] = useState(false);
    const [form] = Form.useForm();
    const initialProfile = {
      position: "Software Engineer",
      level: "Nhân viên",
      education: "Đại học",
      experience: "1 năm kinh nghiệm",
      career: "IT Phần mềm",
      city: "TP.HCM",
      minSalary: "",
      maxSalary: "",
      workplace: "",
      workType: "",
      goal: "",
    };
    const [profile, setProfile] = useState(initialProfile);
  
    const handleEditFinish = (values: any) => {
      setProfile(values);
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
            <Text>Chưa cập nhật</Text>
 
          </div>
          <hr className="my-4 border-gray-100" />
        <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Vị trí mong muốn</Text>
            <br />
            <Text>Chưa cập nhật</Text>
          </div>
          <div className="mb-4">
            <Text strong>Cấp bậc mong muốn</Text>
            <br />
            <Text>0888425000</Text>
          </div>
          <div className="mb-4">
            <Text strong>Trình độ học vấn</Text>
            <br />
            <Text>Nam</Text>
          </div>
          <div className="mb-4">
            <Text strong>Kinh nghiệm</Text>
            <br />
            <Text>26/02/2001</Text>
          </div>
          <div className="mb-4">
            <Text strong>Nghề nghiệp</Text>
            <br />
            <Text>26/02/2001</Text>
          </div>

        </Col>
        <Col xs={24} md={12}>
          <div className="mb-4">
            <Text strong>Địa điểm làm việc</Text>
            <br />
            <Text>Độc thân</Text>
          </div>
          <div className="mb-4">
            <Text strong>Mức lương mong muốn</Text>
            <br />
            <Text>...</Text>
          </div>
          <div className="mb-4">
            <Text strong>Nơi làm việc</Text>
            <br />
            <Text>Bình Tân</Text>
          </div>
          <div className="mb-0">
            <Text strong>Hình thức làm việc</Text>
            <br />
            <Text>1242 QL1A, Tân Tạo A, Bình Tân, TP. HCM</Text>
          </div>
        </Col>
      </Row>
      </Card>

      <ProfileEditModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        form={form}
        initialValues={profile}
        onFinish={handleEditFinish}
      />
        </>
    )
}

export default GeneralInfoCard