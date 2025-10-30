import { Card, Row, Col } from 'antd';
import { FileTextOutlined, EyeOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Pie, Line, Bar } from '@ant-design/plots';

const stats = [
  {
    title: 'Tin tuyển dụng đang đăng',
    value: 4,
    icon: <FileTextOutlined className="text-2xl text-gray-500" />,
  },
  {
    title: 'Lượt xem tin',
    value: 30,
    icon: <EyeOutlined className="text-2xl text-gray-500" />,
  },
  {
    title: 'Ứng viên mới',
    value: 1,
    icon: <UserOutlined className="text-2xl text-gray-500" />,
  },
  {
    title: 'CV đã duyệt',
    value: 1,
    icon: <CheckCircleOutlined className="text-2xl text-gray-500" />,
  },
];

const lineData = [
  { month: 'T1', view: 150, apply: 120 },
  { month: 'T2', view: 200, apply: 180 },
  { month: 'T3', view: 170, apply: 160 },
  { month: 'T4', view: 300, apply: 290 },
  { month: 'T5', view: 250, apply: 240 },
  { month: 'T6', view: 270, apply: 260 },
];

const pieData = [
  { type: 'Đang hiển thị', value: 60 },
  { type: 'Chờ duyệt', value: 25 },
  { type: 'Hết hạn', value: 15 },
];

const barData = [
  { status: 'Chờ duyệt', value: 10 },
  { status: 'Đã duyệt', value: 20 },
  { status: 'Không đạt', value: 7 },
];

const recentActivities = [
  { text: 'Ứng viên mới ứng tuyển vị trí Frontend Developer', time: '2 giờ trước' },
  { text: 'Đăng tin tuyển dụng mới: "Senior Backend Developer"', time: '3 giờ trước' },
];

export default function EmployerDashboard() {
  return (
      <Card title="Tổng quan">
        <Row gutter={16} className="mb-4">
          {stats.map((item: any) => (
            <Col xs={24} sm={12} md={6} key={item.title}>
              <Card>
                <div className="flex items-center gap-4">
                  {item.icon}
                  <div>
                    <div className="text-gray-500 text-xs mb-1">{item.title}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Chart row */}
        <Row gutter={16} className="mb-4">
          <Col xs={24} md={16}>
            <Card  title="Thống kê lượt xem và ứng tuyển">
              <Line
                data={[
                  ...lineData.map((d) => ({ month: d.month, value: d.view, type: 'Lượt xem' })),
                  ...lineData.map((d) => ({ month: d.month, value: d.apply, type: 'Lượt ứng tuyển' })),
                ]}
                xField="month"
                yField="value"
                seriesField="type"
                height={220}
                autoFit
                legend={{ position: 'top' }}
                color={["#1677ff", "#52c41a"]}
                meta={{
                  view: { alias: 'Lượt xem' },
                  apply: { alias: 'Lượt ứng tuyển' },
                }}
                tooltip={{
                  customItems: (items: any) => items.map((item: any, idx: number) => ({ ...item, name: idx === 0 ? 'Lượt xem' : 'Lượt ứng tuyển' })),
                }}
                xAxis={{
                  label: { style: { fontSize: 12 } },
                }}
                yAxis={{
                  label: { style: { fontSize: 12 } },
                }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Trạng thái tin tuyển dụng">
              <Pie
                data={pieData}
                angleField="value"
                colorField="type"
                radius={0.9}
                height={220}
                label={{
                  type: 'spider',
                  content: '{name}: {percentage}',
                }}
                legend={{ position: 'bottom' }}
                color={["#1677ff", "#52c41a", "#faad14"]}
              />
            </Card>
          </Col>
        </Row>
        {/* Bottom row */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card title="Trạng thái ứng tuyển">
              <Bar
                data={barData}
                xField="value"
                yField="status"
                seriesField="status"
                height={180}
                color="#722ed1"
                legend={false}
                barWidthRatio={0.5}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Hoạt động gần đây">
              <ul className="text-sm text-gray-700 space-y-2">
                {recentActivities.map((a: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FileTextOutlined className="text-blue-500" />
                    <span>{a.text}</span>
                    <span className="text-xs text-gray-400 ml-auto">{a.time}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
  );
}
