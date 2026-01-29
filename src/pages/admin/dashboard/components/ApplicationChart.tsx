import { Card, DatePicker } from 'antd';
import { Column } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { IApplicationChartDataDto, IStatisticsQueryParams } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

interface ApplicationChartProps {
    data: IApplicationChartDataDto[];
    onDateRangeChange?: (params?: IStatisticsQueryParams) => void;
    dateParams?: IStatisticsQueryParams;
    loading?: boolean;
}

export default function ApplicationChart({ data, onDateRangeChange, dateParams, loading = false }: ApplicationChartProps) {
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

    const chartConfig = {
        data: data.map(item => ({
            ...item,
            value: item.value ?? 0,
        })),
        xField: 'month',
        yField: 'value',
        color: '#FF9500',
        columnStyle: {
            radius: [8, 8, 0, 0],
        },
        maxColumnWidth: 60,
        minColumnWidth: 20,
        label: false,
        xAxis: {
            label: {
                autoRotate: false,
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
            title="Biểu đồ lượt ứng tuyển"
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
            {!loading && data.length > 0 && <Column {...chartConfig} height={280} />}
            {!loading && data.length === 0 && <div style={{ textAlign: 'center', padding: '40px' }}>Không có dữ liệu</div>}
        </Card>
    );
}

