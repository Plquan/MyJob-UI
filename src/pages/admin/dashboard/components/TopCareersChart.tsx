import { Card, DatePicker } from 'antd';
import { Pie } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ITopCareerDto, IStatisticsQueryParams } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

interface TopCareersChartProps {
    data: ITopCareerDto[];
    onDateRangeChange?: (params?: IStatisticsQueryParams) => void;
    dateParams?: IStatisticsQueryParams;
    loading?: boolean;
}

export default function TopCareersChart({ data, onDateRangeChange, dateParams, loading = false }: TopCareersChartProps) {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

    useEffect(() => {
        if (dateParams?.startDate && dateParams?.endDate) {
            setDateRange([
                dayjs(dateParams.startDate),
                dayjs(dateParams.endDate)
            ]);
        } else {
            setDateRange(null);
        }
    }, [dateParams]);

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);
        if (dates && dates[0] && dates[1]) {
            onDateRangeChange?.({
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        } else {
            onDateRangeChange?.(undefined);
        }
    };

    const totalValue = data.reduce((sum, item) => sum + (item.value ?? 0), 0);
    const chartConfig = {
        data: data.map(item => {
            const value = item.value ?? 0;
            const percent = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0';
            return {
                ...item,
                value,
                percent: `${percent}%`,
            };
        }),
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
            {!loading && data.length > 0 && <Pie {...chartConfig} />}
            {!loading && data.length === 0 && <div style={{ textAlign: 'center', padding: '40px' }}>Không có dữ liệu</div>}
        </Card>
    );
}

