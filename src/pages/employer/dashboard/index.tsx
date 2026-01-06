import { Card, Row, Col, Spin, DatePicker, Space } from 'antd';
import { FileTextOutlined, ClockCircleOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Column, Pie } from '@ant-design/charts';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../stores';
import companyThunks from '../../../stores/companyStore/companyThunk';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export default function EmployerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { employerStatistics, loadingStatistics } = useSelector((state: RootState) => state.companyStore);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  useEffect(() => {
    const params = dateRange 
      ? {
          startDate: dateRange[0]?.format('YYYY-MM-DD'),
          endDate: dateRange[1]?.format('YYYY-MM-DD')
        }
      : undefined;
    dispatch(companyThunks.getEmployerStatistics(params));
  }, [dispatch, dateRange]);

  const stats = useMemo(() => [
    {
      title: 'Tất cả tin tuyển dụng',
      value: employerStatistics?.totalJobPosts || 0,
      icon: <FileTextOutlined />,
      color: 'border-green-200',
      textColor: 'text-green-600',
    },
    {
      title: 'Tin tuyển dụng chờ duyệt',
      value: employerStatistics?.pendingJobPosts || 0,
      icon: <ClockCircleOutlined />,
      color: 'border-blue-200',
      textColor: 'text-blue-500',
    },
    {
      title: 'Tin tuyển dụng hết hạn',
      value: employerStatistics?.expiredJobPosts || 0,
      icon: <CloseCircleOutlined />,
      color: 'border-purple-200',
      textColor: 'text-purple-600',
    },
    {
      title: 'Ứng viên ứng tuyển',
      value: employerStatistics?.totalApplications || 0,
      icon: <UserOutlined />,
      color: 'border-red-200',
      textColor: 'text-red-500',
    },
  ], [employerStatistics]);

  const columnConfig = useMemo(() => {
    if (!employerStatistics?.applicationsMonthly) return { data: [] };

    const data: any[] = [];
    employerStatistics.applicationsMonthly.forEach(item => {
      data.push({
        month: item.month,
        value: item.year2024,
        category: '2024'
      });
      data.push({
        month: item.month,
        value: item.year2023,
        category: '2023'
      });
    });

    return {
      data,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      isGroup: true,
      color: ['#5B8FF9', '#5AD8A6'],
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
      legend: {
        position: 'top-right' as const,
      },
      label: false,
      tooltip: {
        shared: true,
      },
      xAxis: {
        label: {
          autoRotate: false,
          autoHide: true,
        },
      },
    };
  }, [employerStatistics]);

  const pieConfig = useMemo(() => {
    if (!employerStatistics?.applicationsByStatus) return { data: [] };

    const data = employerStatistics.applicationsByStatus.map(item => ({
      type: item.statusName,
      value: item.count
    }));

    return {
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3'],
      radius: 0.9,
      label: false,
      legend: {
        position: 'right' as const,
        offsetX: -10,
        itemName: {
          style: {
            fontSize: 14,
          },
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
    };
  }, [employerStatistics]);

  if (loadingStatistics) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
  };

  return (
    <Card 
      title="Tổng quan"
      extra={
        <Space>
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
            placeholder={['Từ ngày', 'Đến ngày']}
            allowClear
            style={{ width: 230 }}
          />
        </Space>
      }
    >
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((item: any) => (
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
      {/* Charts row */}
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card title="Biểu đồ ứng viên">
            <Column {...columnConfig} height={280} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Biểu đồ tuyển dụng">
            <Pie {...pieConfig} height={280} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

