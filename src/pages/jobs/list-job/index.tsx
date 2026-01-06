import { Select, Typography, Card, Breadcrumb, Empty } from 'antd';
import AdvancedFilter from './components/AdvancedFilter';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import JobCard from '../../../components/JobCard';
import ROUTE_PATH from '../../../routes/routePath';
import type { RootState, AppDispatch } from '../../../stores';
import jobPostThunks from '../../../stores/jobPostStore/jobPostThunk';
import careerThunks from '../../../stores/careerStore/careerThunk';
import provinceThunks from '../../../stores/provinceStore/provinceThunk';

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

const JobPage = () => {
  const featuredCompanies = [];
  const newPosts = [];
  const navigate = useNavigate();
  const { jobPosts, loading, requestParams } = useSelector((state: RootState) => state.jobPostStore);
  const { careers } = useSelector((state: RootState) => state.careerStore);
  const { provinces } = useSelector((state: RootState) => state.provinceStore);
  const dispatch = useDispatch<AppDispatch>();

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [careerId, setCareerId] = useState<number | undefined>(undefined);
  const [provinceId, setProvinceId] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [experience, setExperience] = useState<number | undefined>(undefined);
  const [salaryRange, setSalaryRange] = useState<{ min: number; max: number } | undefined>(undefined);
  const [academicLevel, setAcademicLevel] = useState<number | undefined>(undefined);
  const [jobType, setJobType] = useState<number | undefined>(undefined);
  const [postedWithin, setPostedWithin] = useState<number | undefined>(undefined);

  // Load careers and provinces on mount
  useEffect(() => {
    dispatch(careerThunks.getAllCareers());
    dispatch(provinceThunks.getAllProvinces());
  }, [dispatch]);

  // Fetch jobs with filters
  const fetchJobs = () => {
    dispatch(jobPostThunks.getJobPost({
      page: requestParams.page,
      limit: requestParams.limit,
      jobName: searchTerm || undefined,
      careerId,
      provinceId,
      position,
      experience,
      salaryMin: salaryRange?.min,
      salaryMax: salaryRange?.max,
      academicLevel,
      jobType,
      postedWithinDays: postedWithin,
    }));
  };

  // Auto-fetch when filters change
  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    requestParams.page,
    requestParams.limit,
    searchTerm,
    careerId,
    provinceId,
    position,
    experience,
    salaryRange,
    academicLevel,
    jobType,
    postedWithin
  ]);

  const handleSearch = () => {
    fetchJobs();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCareerId(undefined);
    setProvinceId(undefined);
    setPosition(undefined);
    setExperience(undefined);
    setSalaryRange(undefined);
    setAcademicLevel(undefined);
    setJobType(undefined);
    setPostedWithin(undefined);

    // Fetch jobs without filters
    dispatch(jobPostThunks.getJobPost({
      page: requestParams.page,
      limit: requestParams.limit,
    }));
  };

  return (
    <>
      <AdvancedFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        careerId={careerId}
        onCareerChange={setCareerId}
        provinceId={provinceId}
        onProvinceChange={setProvinceId}
        position={position}
        onPositionChange={setPosition}
        experience={experience}
        onExperienceChange={setExperience}
        salaryRange={salaryRange}
        onSalaryRangeChange={setSalaryRange}
        academicLevel={academicLevel}
        onAcademicLevelChange={setAcademicLevel}
        jobType={jobType}
        onJobTypeChange={setJobType}
        postedWithin={postedWithin}
        onPostedWithinChange={setPostedWithin}
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
        careers={careers || []}
        provinces={provinces || []}
      />
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
