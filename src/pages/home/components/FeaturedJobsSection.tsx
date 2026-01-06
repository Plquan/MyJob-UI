import { Pagination, Spin, Empty } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import JobCard from '../../../components/JobCard';
import type { AppDispatch, RootState } from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import jobPostThunks from '../../../stores/jobPostStore/jobPostThunk';
import { jobPostActions } from '../../../stores/jobPostStore/jobPostReducer';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../routes/routePath';


const PAGE_SIZE = 6;

const FeaturedJobsSection = () => {
  const { jobPosts, loading, requestParams } = useSelector((state: RootState) => state.jobPostStore);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(jobPostThunks.getJobPost({ 
      page: requestParams.page, 
      limit: requestParams.limit,
      jobName: requestParams.jobName 
    }));
  }, [dispatch, requestParams.page, requestParams.limit, requestParams.jobName]);

  const handleJobClick = (jobPostId: number) => {
    navigate(ROUTE_PATH.JOB_DETAIL.replace(':jobPostId', jobPostId.toString()));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10">
      <div className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] rounded-t-xl flex items-center gap-3 px-6 py-3">
        <span className="bg-white/80 rounded-full p-1 flex items-center justify-center">
          <ClockCircleOutlined className="text-[#bfa94a] text-lg" />
        </span>
        <h2 className="text-lg md:text-xl font-bold text-white">Việc làm nổi bật</h2>
      </div>
      <section className="bg-white py-4 px-2 rounded-b-xl shadow-md border border-gray-200">
        <Spin spinning={loading}>
          {!loading && (!jobPosts.items || jobPosts.items.length === 0) ? (
            <Empty description="Chưa có việc làm nào" className="py-8" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {jobPosts.items && jobPosts.items.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    onClick={handleJobClick}
                  />
                ))}
              </div>
              {jobPosts.totalItems > PAGE_SIZE && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    current={requestParams.page}
                    pageSize={PAGE_SIZE}
                    total={jobPosts.totalItems}
                    onChange={(page) => dispatch(jobPostActions.setPage(page))}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </Spin>
      </section>
    </div>
  );
};

export default FeaturedJobsSection; 