import { Card, DatePicker } from 'antd';
import { Column } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { IRevenuePackageChartDataDto, IStatisticsQueryParams } from '@/types/statistics/StatisticsType';

const { RangePicker } = DatePicker;

interface RevenuePackageChartProps {
    data: IRevenuePackageChartDataDto[];
    onDateRangeChange?: (params?: IStatisticsQueryParams) => void;
    dateParams?: IStatisticsQueryParams;
    loading?: boolean;
}

export default function RevenuePackageChart({ data, onDateRangeChange, dateParams, loading = false }: RevenuePackageChartProps) {
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
        data: data,
        xField: 'packageName',
        yField: 'revenue',
        color: '#10B981',
        columnStyle: {
            radius: [8, 8, 0, 0],
        },
        maxColumnWidth: 80,
        minColumnWidth: 30,
        label: {
            position: 'top' as const,
            formatter: (datum: any) => `${((datum.revenue ?? 0) / 1000000).toFixed(0)}M`,
        },
        xAxis: {
            label: {
                autoRotate: false,
                autoHide: true,
            },
        },
        yAxis: {
            label: {
                formatter: (v: string) => `${(Number(v) / 1000000).toFixed(0)}M`,
            },
        },
        tooltip: {
            formatter: (datum: any) => {
                return {
                    name: 'Doanh thu',
                    value: `${(datum.revenue ?? 0).toLocaleString('vi-VN')} VND`,
                };
            },
        },
    };

    return (
        <Card
            title="Doanh thu theo gói dịch vụ"
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

