import { Card, DatePicker, message } from 'antd';
import { Column } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import statisticsService from '@/services/statisticsService';
import type { IJobPostChartDataDto } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

export default function JobPostChart() {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [data, setData] = useState<IJobPostChartDataDto[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (params?: { startDate?: string; endDate?: string }) => {
        try {
            setLoading(true);
            const result = await statisticsService.getJobPostChart(params);
            setData(result);
        } catch (error: any) {
            console.error('Failed to fetch job post chart data:', error);
            message.error('Không thể tải dữ liệu biểu đồ bài đăng');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);
        if (dates && dates[0] && dates[1]) {
            fetchData({
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        } else {
            fetchData();
        }
    };

    const chartConfig: any = {
        data: data,
        xField: 'month',
        yField: 'value',
        colorField: 'status',
        isStack: true,
        color: {
            'Chờ duyệt': '#FF9500',
            'Đã duyệt': '#22C55E',
            'Không duyệt': '#EF4444',
        },
        columnStyle: {
            radius: [8, 8, 0, 0],
        },
        maxColumnWidth: 60,
        minColumnWidth: 20,
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            shared: true,
        },
        label: false,
        xAxis: {
            label: {
                autoRotate: false,
                autoHide: true,
            },
        },
    };

    return (
        <Card
            title="Biểu đồ bài đăng tuyển dụng"
            loading={loading}
            extra={
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    size="small"
                    placeholder={['Từ ngày', 'Đến ngày']}
                    allowClear
                    presets={[
                        { label: 'Today', value: [dayjs(), dayjs()] },
                        { label: 'Yesterday', value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
                        { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] },
                        { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] },
                        { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
                        { label: 'Last Month', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
                    ]}
                />
            }
            styles={{ body: { height: '330px' } }}
        >
            {!loading && <Column {...chartConfig} height={280} />}
        </Card>
    );
}

