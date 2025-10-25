import { Card, Col, Row, Typography } from "antd"

const { Text, Title } = Typography
const PartnerSection = () => {
    return (
        <>
         <div className=" mb-10">
          <Title level={3} className="text-center !mb-8">Đối tác chiến lược</Title>
          <Row gutter={[24, 24]} justify="center">
            {[{
              name: "Google",
              desc: "Hợp tác chiến lược để mang lại lợi ích tối ưu cho khách hàng."
            }, {
              name: "Microsoft",
              desc: "Hợp tác chiến lược để mang lại lợi ích tối ưu cho khách hàng."
            }, {
              name: "Amazon",
              desc: "Hợp tác chiến lược để mang lại lợi ích tối ưu cho khách hàng."
            }].map((partner, idx) => (
              <Col xs={24} md={8} key={partner.name}>
                <Card className="shadow rounded-xl h-full text-center">
                  <Title level={4} className="!mb-4">{partner.name}</Title>
                  <Text className="text-gray-700">{partner.desc}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        </>
    )
}

export default PartnerSection