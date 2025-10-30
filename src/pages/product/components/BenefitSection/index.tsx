import { Typography, Row, Col } from "antd"
import { SmileOutlined } from "@ant-design/icons";
const { Title } = Typography
const benefits = [
    {
      icon: <SmileOutlined className="text-green-500! text-4xl" />,
      text: "Tiết kiệm thời gian với công cụ tự động hóa trong tuyển dụng."
    },
    {
      icon: <SmileOutlined className="text-blue-500! text-4xl" />,
      text: "Tăng khả năng tiếp cận đến hàng ngàn ứng viên tiềm năng."
    },
    {
      icon: <SmileOutlined className="text-red-500! text-4xl" />,
      text: "Hỗ trợ tối ưu chi phí và cải thiện hiệu quả tuyển dụng."
    },
  ]
  
const BenefitSection = () => {
    return (
        <>
         <div className="mb-12">
          <Title level={3} className="text-center !mb-6">Lợi ích khi sử dụng dịch vụ của chúng tôi</Title>
          <Row gutter={[24, 24]} justify="center">
            {benefits.map((b, idx) => (
              <Col xs={24} md={8} key={idx}>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center h-full">
                  {b.icon}
                  <div className="mt-4">{b.text}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        </>
    )
}

export default BenefitSection