import { Row, Col, Card } from "antd"
import { CheckCircleOutlined, BarChartOutlined, SearchOutlined, ApiOutlined, UserOutlined, ThunderboltOutlined, StarOutlined, TeamOutlined, SolutionOutlined } from "@ant-design/icons";
import { Typography } from "antd"

const { Title } = Typography;

const packages = [
    {
      name: "Basic",
      price: "50.000 VND",
      features: [
        { icon: <UserOutlined />, text: "Huy hiệu nhà tuyển dụng (Bình thường)" },
        { icon: <BarChartOutlined />, text: "Báo cáo phân tích (Cơ bản)" },
        { icon: <SearchOutlined />, text: "Tìm kiếm ứng viên (Cơ bản)" },
        { icon: <ThunderboltOutlined />, text: "Mức độ hỗ trợ (Bình thường)" },
        { icon: <TeamOutlined />, text: "Xem hồ sơ ứng viên (Cơ bản)" },
        { icon: <StarOutlined />, text: "Ưu tiên tìm kiếm (Bình thường)" },
        { icon: <ApiOutlined />, text: "Truy cập API (Không)" },
      ],
      color: "text-blue-500"
    },
    {
      name: "Premium",
      price: "2.000.000 VND",
      features: [
        { icon: <ThunderboltOutlined />, text: "Mức độ hỗ trợ (Bình thường)" },
        { icon: <CheckCircleOutlined />, text: "Ghim tin tuyển dụng (50 lượt)" },
        { icon: <SearchOutlined />, text: "Tìm kiếm ứng viên (Nâng cao)" },
        { icon: <StarOutlined />, text: "Ưu tiên tìm kiếm (Cao)" },
        { icon: <UserOutlined />, text: "Huy hiệu nhà tuyển dụng (Uy tín)" },
        { icon: <ApiOutlined />, text: "Truy cập API (Không)" },
        { icon: <TeamOutlined />, text: "Xem hồ sơ ứng viên (Không giới hạn)" },
      ],
      color: "text-blue-500"
    },
    {
      name: "Enterprise",
      price: "5.000.000 VND",
      features: [
        { icon: <BarChartOutlined />, text: "Báo cáo phân tích (Chi tiết)" },
        { icon: <StarOutlined />, text: "Ưu tiên tìm kiếm (Cao nhất)" },
        { icon: <ApiOutlined />, text: "Truy cập API (Có)" },
        { icon: <SearchOutlined />, text: "Tìm kiếm ứng viên (AI Matching)" },
        { icon: <ThunderboltOutlined />, text: "Mức độ hỗ trợ (Hỗ trợ 24/7)" },
        { icon: <TeamOutlined />, text: "Xem hồ sơ ứng viên (Không giới hạn)" },
        { icon: <SolutionOutlined />, text: "Mời phỏng vấn (Không giới hạn)" },
      ],
      color: "text-blue-500"
    },
  ]
export const PackageCard = () => {
 return (
    <>
            <div className="text-center mb-8">
          <Title level={3} className="!mb-6">Các Gói Dịch Vụ Đăng Tuyển</Title>
          <Row gutter={[24, 24]} justify="center">
            {packages.map((pkg) => (
              <Col xs={24} md={8} key={pkg.name}>
                <Card
                  title={<span className={`font-bold text-lg ${pkg.color}`}>{pkg.name}</span>}
                  className="shadow-lg rounded-xl h-full"
                >
                  <div className="text-center mb-4">
                    <span className="text-2xl font-semibold">{pkg.price}</span>
                    <span className="text-gray-500">/30 ngày</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        {f.icon}
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    </>
)
}

export default PackageCard