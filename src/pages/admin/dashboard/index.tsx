import { Card, Row, Col, Spin, message } from 'antd';
import { UserOutlined, BankOutlined, FileTextOutlined, FormOutlined, DollarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import statisticsService from '@/services/statisticsService';
import type { IStatsDto } from '@/types/statistics/StatisticsType';
import UserChart from './components/UserChart';
import JobPostChart from './components/JobPostChart';
import TopCareersChart from './components/TopCareersChart';
import ApplicationChart from './components/ApplicationChart';
import RevenuePackageChart from './components/RevenuePackageChart';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<IStatsDto | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await statisticsService.getStats();
            setStats(data);
        } catch (error: any) {
            console.error('Failed to fetch stats:', error);
            message.error('Không thể tải dữ liệu thống kê tổng quan');
        } finally {
            setLoading(false);
        }
    };

    const statsCards = stats ? [
        {
            title: 'Ứng viên',
            value: stats.jobSeekers,
            icon: <UserOutlined />,
            color: 'border-pink-200',
            textColor: 'text-pink-500',
        },
        {
            title: 'Nhà tuyển dụng',
            value: stats.employers,
            icon: <BankOutlined />,
            color: 'border-orange-200',
            textColor: 'text-orange-500',
        },
        {
            title: 'Bài đăng tuyển dụng',
            value: stats.jobPosts,
            icon: <FileTextOutlined />,
            color: 'border-yellow-200',
            textColor: 'text-yellow-600',
        },
        {
            title: 'Lượt ứng tuyển',
            value: stats.applications,
            icon: <FormOutlined />,
            color: 'border-purple-200',
            textColor: 'text-purple-500',
        },
        {
            title: 'Doanh thu',
            value: stats.revenue,
            icon: <DollarOutlined />,
            color: 'border-green-200',
            textColor: 'text-green-600',
        },
    ] : [];

    return (
        <Card title="Tổng quan quản trị">
            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                {loading ? (
                    <Col span={24} style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin tip="Đang tải thống kê tổng quan..." />
                    </Col>
                ) : (
                    statsCards.map((item) => (
                        <Col xs={24} sm={12} md={8} lg={4.8} key={item.title}>
                            <Card className={`rounded-xl ${item.color}`}>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-2">{item.title}</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-2xl ${item.textColor}`}>{item.icon}</span>
                                        <span className={`text-xl font-semibold ${item.textColor}`}>
                                            {item.value.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {/* Charts Grid */}
            <Row gutter={[16, 16]}>
                {/* User Chart - Full Width */}
                <Col xs={24}>
                    <UserChart />
                </Col>

                {/* Job Post Chart */}
                <Col xs={24} lg={12}>
                    <JobPostChart />
                </Col>

                {/* Revenue by Service Package Chart */}
                <Col xs={24} lg={12}>
                    <RevenuePackageChart />
                </Col>

                {/* Top 5 Careers */}
                <Col xs={24} lg={12}>
                    <TopCareersChart />
                </Col>

                {/* Application Chart */}
                <Col xs={24} lg={12}>
                    <ApplicationChart />
                </Col>
            </Row>
        </Card>
    );
}
