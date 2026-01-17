import { Card, DatePicker, message } from 'antd';
import { Pie } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import statisticsService from '@/services/statisticsService';
import type { ITopCareerDto } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

export default function TopCareersChart() {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [data, setData] = useState<ITopCareerDto[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (params?: { startDate?: string; endDate?: string }) => {
        try {
            setLoading(true);
            const result = await statisticsService.getTopCareers(params);
            setData(result);
        } catch (error: any) {
            console.error('Failed to fetch top careers data:', error);
            message.error('Không thể tải dữ liệu top ngành nghề');
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
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        autoFit: false,
        width: 280,
        height: 280,
        label: {
            content: (item: any) => `${item.type}\n${item.percent}`,
        },
        legend: {
            position: 'bottom' as const,
        },
    };

    return (
        <Card
            title="Top 5 ngành nghề"
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
            {!loading && <Pie {...chartConfig} />}
        </Card>
    );
}

