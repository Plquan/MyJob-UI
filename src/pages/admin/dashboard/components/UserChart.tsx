import { Card, DatePicker, message } from 'antd';
import { Line } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import statisticsService from '@/services/statisticsService';
import type { IUserChartDataDto } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

export default function UserChart() {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [data, setData] = useState<IUserChartDataDto[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (params?: { startDate?: string; endDate?: string }) => {
        try {
            setLoading(true);
            const result = await statisticsService.getUserChart(params);
            setData(result);
        } catch (error: any) {
            console.error('Failed to fetch user chart data:', error);
            message.error('Không thể tải dữ liệu biểu đồ người dùng');
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

    const chartConfig = {
        data: data.flatMap(item => [
            { date: item.date, value: item.jobSeeker, category: 'Job Seeker' },
            { date: item.date, value: item.employer, category: 'Employer' }
        ]),
        xField: 'date',
        yField: 'value',
        seriesField: 'category',
        color: ['#FF6B35', '#4A4A4A'],
        smooth: true,
        lineStyle: {
            lineWidth: 2,
        },
        point: {
            size: 4,
            shape: 'circle',
        },
        legend: {
            position: 'top' as const,
        },
        xAxis: {
            label: {
                autoRotate: true,
                autoHide: true,
            },
        },
        yAxis: {
            label: {
                formatter: (v: string) => `${v}k`,
            },
        },
    };

    return (
        <Card
            title="Biểu đồ người dùng"
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
            {!loading && <Line {...chartConfig} height={280} />}
        </Card>
    );
}

