import { Card, Row, Col, Spin, Empty } from 'antd';
import {
  HeartOutlined,
  FileTextOutlined,
  SaveOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../../stores';
import candidateThunks from '../../../stores/candidateStore/candidateThunk';
import JobCard from '../../../components/JobCard';
import { BookmarkIcon } from '@/assets/icon/bookmark';

const OverviewDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { activityStatistics, loading, recommendedJobs, loadingRecommendations } = useSelector((state: RootState) => state.candidateStore);

  useEffect(() => {
    dispatch(candidateThunks.getActivityStatistics());
    dispatch(candidateThunks.getRecommendedJobs(6));
  }, [dispatch]);

  const stats = useMemo(() => [
    {
      title: 'Việc làm đã ứng tuyển',
      value: activityStatistics?.appliedJobs || 0,
      icon: <FileTextOutlined />,
      color: 'border-green-200',
      textColor: 'text-green-600',
    },
    {
      title: 'Việc làm đã lưu',
      value: activityStatistics?.savedJobs || 0,
      icon: <HeartOutlined />,
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
      value: activityStatistics?.followedCompanies || 0,
      icon: <BookmarkIcon className="w-6 h-6" />,
      color: 'border-red-200',
      textColor: 'text-red-500',
    },
  ], [activityStatistics]);

  const chartData = useMemo(() => {
    if (!activityStatistics?.monthlyActivity) return [];

    const data: any[] = [];
    activityStatistics.monthlyActivity.forEach((item) => {
      data.push({
        month: item.month,
        value: item.appliedJobs,
        type: 'Việc đã ứng tuyển'
      });
      data.push({
        month: item.month,
        value: item.savedJobs,
        type: 'Việc đã lưu'
      });
      data.push({
        month: item.month,
        value: item.followedCompanies,
        type: 'Công ty đang theo dõi'
      });
    });
    return data;
  }, [activityStatistics]);

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    height: 260,
    point: { size: 5, shape: 'circle' },
    color: ['#1677ff', '#ec4899', '#fbbf24'],
    yAxis: {
      label: { style: { fontSize: 12 } },
    },
    xAxis: {
      label: {
        style: { fontSize: 12 },
        autoRotate: true,
        autoHide: false,
      },
    },
    tooltip: { showMarkers: true },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

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
      <Card className="rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Việc làm gợi ý</h2>
          {recommendedJobs.length > 0 && (
            <button
              onClick={() => navigate('/candidate/find-job')}
              className="text-[#6A5ACD] hover:text-[#5848b8] font-medium text-sm"
            >
              Xem tất cả →
            </button>
          )}
        </div>

        {loadingRecommendations ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : recommendedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={(jobId) => navigate(`/candidate/find-job/${jobId}`)}
                size="large"
              />
            ))}
          </div>
        ) : (
          <Empty
            description={
              <div className="text-center">
                <p className="text-gray-500 mb-2">Chưa có việc làm gợi ý</p>
                <p className="text-gray-400 text-sm">
                  Hãy cập nhật resume của bạn để nhận được gợi ý phù hợp
                </p>
              </div>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="py-8"
          />
        )}
      </Card>
    </>
  );
};

export default OverviewDashboard;
