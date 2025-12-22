import { Pagination } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import JobCard from '../../../components/JobCard';
import type { AppDispatch, RootState } from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import jobPostThunks from '../../../stores/jobPostStore/jobPostThunk';


const PAGE_SIZE = 6;

const FeaturedJobsSection = () => {
  const { jobPosts,loading } = useSelector((state: RootState) => state.jobPostStore);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(jobPostThunks.getJobPost());
  }, [dispatch]);
  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10">
      <div className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] rounded-t-xl flex items-center gap-3 px-6 py-3">
        <span className="bg-white/80 rounded-full p-1 flex items-center justify-center">
          <ClockCircleOutlined className="text-[#bfa94a] text-lg" />
        </span>
        <h2 className="text-lg md:text-xl font-bold text-white">Việc làm nổi bật</h2>
      </div>
      <section className="bg-white py-4 px-2 rounded-b-xl shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {jobPosts.map(job => (
            <JobCard 
              key={job.id} 
              job={job}
              onClick={(job) => {
                console.log('Job clicked:', job);
              }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            current={1}
            pageSize={PAGE_SIZE}
            total={jobPosts.length}
            onChange={() => {}}
            showSizeChanger={false}
          />
        </div>
      </section>
    </div>
  );
};

export default FeaturedJobsSection; 