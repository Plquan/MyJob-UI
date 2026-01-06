import { Select, Typography, Card, Breadcrumb, Empty } from 'antd';
import AdvancedFilter from './components/AdvancedFilter';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import JobCard from '../../../components/JobCard';
import ROUTE_PATH from '../../../routes/routePath';
import type { RootState, AppDispatch } from '../../../stores';
import jobPostThunks from '../../../stores/jobPostStore/jobPostThunk';
const { Title } = Typography;

const breadcrumbItems = [
  {
    title: (
      <a href="/" className="text-[#6A5ACD]! underline! font-bold">
        Trang chủ
      </a>
    ),
  },
  {
    title: "Tuyển dụng",
  },
];

const JobPage  = () => {
  const featuredCompanies = [];
  const newPosts = [];
  const navigate = useNavigate();
  const { jobPosts, loading, requestParams } = useSelector((state: RootState) => state.jobPostStore);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(jobPostThunks.getJobPost({ 
      page: requestParams.page, 
      limit: requestParams.limit,
      jobName: requestParams.jobName 
    }));
  }, [dispatch, requestParams.page, requestParams.limit, requestParams.jobName]);

  return (
    <>
      <AdvancedFilter />
      <div className="max-w-7xl mx-auto p-4 md:p-5 pt-6 md:pt-10 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Main content */}
        <div className="flex-1 w-full lg:w-auto">
          
        <div className='rounded-lg bg-white border-2 border-gray-100 p-3'>
          {/* Breadcrumb nằm trên */}
          <Breadcrumb className="mb-2! text-purple-800" items={breadcrumbItems} />

          {/* Title bên dưới */}
          <Title level={2} className=' font-bold!'>
            Tuyển dụng <span className='text-[#6A5ACD]!'>{jobPosts.totalItems}</span> việc làm mới nhất năm <span className="text-[#6A5ACD]! font-bold">2024</span>
          </Title>
        </div>


          <div className="flex justify-between items-center mb-5 mt-5">
            <div><span className="font-semibold">{jobPosts.totalItems}</span><span> việc làm</span></div> 
            <Select defaultValue="newest" className="w-40">
              <Select.Option value="newest">Mới nhất</Select.Option>
            </Select>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
              <Empty description="Đang tải..." />
            </div>
          ) : jobPosts.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:gap-5">
              {jobPosts.items.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  size="large"
                  onClick={(jobPostId) => {
                    navigate(ROUTE_PATH.JOB_DETAIL.replace(':jobPostId', jobPostId.toString()));
                  }}
                />
              ))}
            </div>
          )}

        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-4 md:gap-6 shrink-0">
        <Card
          className="shadow-lg"
          title={<span className="text-[#6A5ACD]! font-bold">Công ty nổi bật</span>}
        >
          {featuredCompanies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            <></>
          )}
        </Card>

        <Card
          className="shadow-lg"
          title={<span className="text-[#6A5ACD]! font-bold">Bài viết mới</span>}
        >
          {newPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            <></>
          )}
        </Card>
              </div>

      </div>
    </>
  );
};

export default JobPage;
