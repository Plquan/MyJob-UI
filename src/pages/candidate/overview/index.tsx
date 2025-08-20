import { Card, Row, Col, Statistic } from 'antd';
import {
  EyeOutlined,
  HeartOutlined,
  FileTextOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';

const stats = [
  {
    title: 'Việc làm đã ứng tuyển',
    value: 0,
    icon: <FileTextOutlined />,
    color: 'border-green-200',
    textColor: 'text-green-600',
  },
  {
    title: 'Việc làm đã lưu',
    value: 0,
    icon: <SaveOutlined />,
    color: 'border-purple-200',
    textColor: 'text-purple-600',
  },
  {
    title: 'Công ty đã xem hồ sơ',
    value: 0,
    icon: <EyeOutlined />,
    color: 'border-blue-200',
    textColor: 'text-blue-500',
  },
  {
    title: 'Công ty đang theo dõi',
    value: 0,
    icon: <HeartOutlined />,
    color: 'border-red-200',
    textColor: 'text-red-500',
  },
];


const chartData = [
  { month: 'T4-2023', value: 0 },
  { month: 'T5-2023', value: 0 },
  { month: 'T6-2023', value: 0 },
  { month: 'T7-2023', value: 0 },
  { month: 'T8-2023', value: 0 },
  { month: 'T9-2023', value: 0 },
  { month: 'T10-2023', value: 0 },
  { month: 'T11-2023', value: 0 },
  { month: 'T12-2023', value: 0 },
  { month: 'T1-2024', value: 0 },
  { month: 'T2-2024', value: 0 },
  { month: 'T3-2024', value: 0 },
  { month: 'T4-2024', value: 0 },
];

const config = {
  data: chartData,
  xField: 'month',
  yField: 'value',
  height: 260,
  point: { size: 5, shape: 'diamond' },
  lineStyle: { stroke: '#1677ff', lineWidth: 2 },
  yAxis: {
    min: -1,
    max: 1,
    tickInterval: 0.2,
    label: { style: { fontSize: 12 } },
  },
  xAxis: {
    label: { style: { fontSize: 12 } },
  },
  tooltip: { showMarkers: false },
  smooth: true,
};

const OverviewDashboard = () => {
  return (
    <>

    <Row gutter={[24, 24]} className="mb-6">
      {stats.map((item) => (
        <Col xs={24} sm={12} lg={6} key={item.title}>
          <Card className={`rounded-xl ${item.color}`}>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-2">{item.title}</span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${item.textColor}`}>{item.icon}</span>
                <span className={`text-xl font-semibold ${item.textColor}`}>{item.value}</span>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>

 
      <Card className="rounded-xl  mb-6! w-full">
        <h2 className="text-xl font-bold mb-4">Hoạt động của bạn</h2>
        <Line {...config} />
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-2 bg-blue-400 inline-block rounded" />
            Việc đã ứng tuyển
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-2 bg-pink-300 inline-block rounded" />
            Việc đã lưu
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-2 bg-yellow-300 inline-block rounded" />
            Công ty đang theo dõi
          </div>
        </div>
      </Card>

      {/* Suggested Jobs */}
      <Card className="rounded-xl min-h-[180px] flex items-center justify-center w-full">
        <span className="text-gray-400 text-lg">Việc làm gợi ý</span>
      </Card>
    </>
  );
};

export default OverviewDashboard;
