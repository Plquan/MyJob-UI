import { Spin, Empty, Card, Tag, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../components/JobCard';
import ROUTE_PATH from '../../../routes/routePath';
import jobPostActivityService from '../../../services/jobPostActivityService';
import type { IAppliedJob } from '../../../types/job-post-activity/JobPostActivity';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const MyAppliedJobs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<IAppliedJob[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchAppliedJobs = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await jobPostActivityService.getMyAppliedJobs({
        page,
        limit: pagination.limit,
      });
      setAppliedJobs(response.items);
      setPagination({
        page,
        limit: pagination.limit,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
      });
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleJobClick = (jobPostId: number) => {
    navigate(ROUTE_PATH.JOB_DETAIL.replace(':jobPostId', jobPostId.toString()));
  };

  const handlePageChange = (page: number) => {
    fetchAppliedJobs(page);
  };

  const getStatusTag = (status: number, isDeleted: boolean) => {
    if (isDeleted) {
      return <Tag color="default" icon={<CloseCircleOutlined />}>Đã bị xóa bởi NTD</Tag>;
    }
    switch (status) {
      case 1: // Pending
        return <Tag color="processing" icon={<ClockCircleOutlined />}>Đang chờ duyệt</Tag>;
      case 4: // Interviewed
        return <Tag color="blue" icon={<CheckCircleOutlined />}>Đã phỏng vấn</Tag>;
      case 5: // Accepted
        return <Tag color="success" icon={<CheckCircleOutlined />}>Đã chấp nhận</Tag>;
      case 6: // Rejected
        return <Tag color="error" icon={<CloseCircleOutlined />}>Đã từ chối</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Công việc đã ứng tuyển</h2>
        <p className="text-sm text-gray-500 mt-1">
          Danh sách các công việc bạn đã ứng tuyển ({pagination.totalItems} việc làm)
        </p>
      </div>

      <Spin spinning={loading}>
        {appliedJobs.length === 0 ? (
          <Empty 
            description="Bạn chưa ứng tuyển công việc nào" 
            className="py-8"
          />
        ) : (
          <>
            <div className="space-y-4">
              {appliedJobs.map((appliedJob) => (
                <Card 
                  key={appliedJob.id}
                  className="hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <JobCard 
                          job={appliedJob.jobPost} 
                          onClick={handleJobClick}
                          size="large"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Trạng thái:</span>
                        {getStatusTag(appliedJob.status, appliedJob.isDeleted)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Ngày ứng tuyển:</span>
                        <span className="text-sm font-medium">
                          {new Date(appliedJob.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  current={pagination.page}
                  total={pagination.totalItems}
                  pageSize={pagination.limit}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showTotal={(total) => `Tổng ${total} việc làm`}
                />
              </div>
            )}
          </>
        )}
      </Spin>
    </div>
  );
};

export default MyAppliedJobs;

