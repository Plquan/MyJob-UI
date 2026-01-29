
import { Card, Button, Empty, Breadcrumb, Tag } from 'antd';
import { MailOutlined, PhoneOutlined, HeartOutlined, HeartFilled, LoadingOutlined, EnvironmentOutlined, CalendarOutlined, UserOutlined, BookOutlined, SolutionOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import type { AppDispatch, RootState } from '../../../stores';
import { jobPostActions } from '../../../stores/jobPostStore/jobPostReducer';
import jobPostThunks from '../../../stores/jobPostStore/jobPostThunk';
import JobCard from '../../../components/JobCard';
import ROUTE_PATH from '../../../routes/routePath';
import { POSITION_OPTIONS, ACADEMICLEVEL_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS } from '../../../constant/selectOptions';
import ApplyJobModal from './components/ApplyJobModal';
import { useAuthorization } from '../../../ultils/hooks/useAuthorization';
import { EUserRole } from '../../../constant/role';

const JobDetail = () => {
  const { jobPostId } = useParams<{ jobPostId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jobPostDetail, isSubmiting, loading, jobPosts, requestParams } = useSelector((state: RootState) => state.jobPostStore);
  const { provinces } = useSelector((state: RootState) => state.provinceStore);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { requireCandidate } = useAuthorization([EUserRole.CANDIDATE]);

  const currentJob = jobPostDetail;
  const isSaved = currentJob?.isSaved ?? false;
  const currentJobSubmiting = jobPostId ? (isSubmiting[parseInt(jobPostId)] ?? false) : false;
  
  // Kiểm tra deadline đã hết hạn chưa
  const isDeadlineExpired = useMemo(() => {
    if (!currentJob?.deadline) return false;
    return new Date() > new Date(currentJob.deadline);
  }, [currentJob?.deadline]);

  // Lấy tên tỉnh từ store
  const provinceName = useMemo(() => {
    if (!currentJob?.provinceId) return 'N/A';
    const province = provinces?.find(p => p.id === currentJob.provinceId);
    return province?.name || 'N/A';
  }, [currentJob?.provinceId, provinces]);

  // Lấy các job tương tự (loại trừ job hiện tại)
  const similarJobs = useMemo(() => {
    if (!jobPosts.items || !currentJob) return [];
    return jobPosts.items
      .filter(job => job.id !== currentJob.id && job.provinceId === currentJob.provinceId)
      .slice(0, 4);
  }, [jobPosts.items, currentJob]);

  // Lấy label từ options
  const getPositionLabel = (value: number) => POSITION_OPTIONS.find(opt => opt.value === value)?.label || 'N/A';
  const getAcademicLevelLabel = (value: number) => ACADEMICLEVEL_OPTIONS.find(opt => opt.value === value)?.label || 'N/A';
  const getExperienceLabel = (value: number) => EXPERIENCE_OPTIONS.find(opt => opt.value === value)?.label || 'N/A';
  const getJobTypeLabel = (value: number) => JOBTYPE_OPTIONS.find(opt => opt.value === value)?.label || 'N/A';

  useEffect(() => {
    if (jobPostId) {
      dispatch(jobPostThunks.getJobPostById(parseInt(jobPostId)));
      dispatch(jobPostThunks.getJobPost({ 
        page: requestParams.page, 
        limit: requestParams.limit,
        jobName: requestParams.jobName 
      }));
    }
  }, [jobPostId, dispatch, requestParams.page, requestParams.limit, requestParams.jobName]);

  const handleToggleSave = () => {
    if (!requireCandidate()) {
      return;
    }
    if (jobPostId) {
      dispatch(jobPostActions.toggleSaveJobPost(parseInt(jobPostId)));
    }
  };

  const handleApplyJob = () => {
    setIsApplyModalOpen(true);
  };

  const breadcrumbItems = [
    {
      title: (
        <a href="/" className="text-[#6A5ACD]! underline! font-bold">
          Trang chủ
        </a>
      ),
    },
    {
      title: (
        <a href={ROUTE_PATH.JOBS} className="text-[#6A5ACD]! underline! font-bold">
          Tuyển dụng
        </a>
      ),
    },
  ];

  if (!currentJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty description="Không tìm thấy thông tin công việc" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb className="text-purple-800" items={breadcrumbItems} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cột trái: Chi tiết công việc */}
          <div className="flex-1 flex flex-col gap-6">
            {/* HEADER */}
            <Card loading={loading} className="rounded-xl border-2! border-gray-200! bg-white">
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 p-6 pb-2">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <img
                    src={currentJob.company?.logo || "/assets/vinhuni.png"}
                    alt={currentJob.company?.companyName || "Company"}
                    className="w-24 h-24 object-contain p-3 border-2! border-gray-200! bg-white"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center md:justify-between md:flex-row md:items-center gap-2">
                  <div className="flex-1 flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">{currentJob.jobName}</h2>
                      {currentJob.isHot && <Tag color="gold">Nổi bật</Tag>}
                      {currentJob.isNew && <Tag color="blue">Mới</Tag>}
                    </div>
                    <div className="text-[#6A5ACD] font-semibold mb-1">{currentJob.company?.companyName || 'N/A'}</div>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-1">
                      <span className="flex items-center text-[#6A5ACD] font-bold">
                        {currentJob.salaryMin?.toLocaleString('vi-VN') || 'N/A'} - {currentJob.salaryMax?.toLocaleString('vi-VN') || 'N/A'} đ
                      </span>
                      <span className="flex items-center">
                        <EnvironmentOutlined className="mr-1" />
                        {provinceName}
                      </span>
                      {currentJob.deadline && (
                        <span className="flex items-center">
                          <CalendarOutlined className="mr-1" />
                          Hết hạn: {new Date(currentJob.deadline).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 px-6 pb-6 pt-5">
                <Button
                  onClick={handleApplyJob}
                  disabled={currentJobSubmiting || currentJob.isApplied || isDeadlineExpired}
                  type="primary"
                  className={`
                        px-8 font-semibold text-base h-10 hover:opacity-90
                        ${currentJob.isApplied || isDeadlineExpired
                      ? 'bg-gray-300! border-gray-300! cursor-not-allowed'
                      : 'bg-[#6A5ACD]! border-[#6A5ACD]!'
                    }
                  `}
                >
                  {currentJob.isApplied ? 'Đã nộp đơn' : isDeadlineExpired ? 'Đã hết hạn' : 'Nộp đơn ngay'}
                </Button>

                <Button
                  icon={currentJobSubmiting ? <LoadingOutlined spin /> : (isSaved ? <HeartFilled /> : <HeartOutlined />)}
                  className={`font-semibold h-10 ${isSaved
                      ? 'bg-[#6A5ACD]! border-[#6A5ACD]! text-white! hover:opacity-90'
                      : 'border-[#6A5ACD] text-[#6A5ACD]'
                    }`}
                  onClick={handleToggleSave}
                  disabled={currentJobSubmiting || !jobPostId}
                  loading={currentJobSubmiting}
                >
                  {isSaved ? 'Đã lưu' : 'Lưu tin'}
                </Button>
              </div>
            </Card>

            {/* Body content - bọc trong background trắng */}
            <div className="bg-white rounded-xl  border-2!  border-gray-200 p-6 flex flex-col gap-6">
              {/* Mô tả công việc */}
              <Card loading={loading} className=" shadow bg-white">
                <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">Mô tả công việc</h3>
                <div className="text-gray-700 text-base whitespace-pre-line">
                  {currentJob.jobDescription || 'Chưa có mô tả công việc'}
                </div>
              </Card>

              {/* Yêu cầu công việc */}
              {currentJob.jobRequirement && (
                <Card loading={loading} className=" shadow bg-white">
                  <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">Yêu cầu công việc</h3>
                  <div className="text-gray-700 text-base whitespace-pre-line">
                    {currentJob.jobRequirement}
                  </div>
                </Card>
              )}

              {/* Thông tin chi tiết */}
              <Card loading={loading} className=" shadow bg-white">
                <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">Thông tin chi tiết</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-base text-gray-700">
                  <div><span className="font-semibold">Mã công việc:</span> JOB-{String(currentJob.id).padStart(5, '0')}</div>
                  <div><span className="font-semibold">Số lượng:</span> {currentJob.quantity || 'Không giới hạn'}</div>
                  <div><span className="font-semibold">Địa điểm:</span> {provinceName}</div>
                  <div><span className="font-semibold">Mức lương:</span>
                    <span className="text-[#6A5ACD] font-bold ml-2">
                      {currentJob.salaryMin?.toLocaleString('vi-VN') || 'N/A'} - {currentJob.salaryMax?.toLocaleString('vi-VN') || 'N/A'} đ
                    </span>
                  </div>
                  {currentJob.deadline && (
                    <div><span className="font-semibold">Hạn nộp hồ sơ:</span> {new Date(currentJob.deadline).toLocaleDateString('vi-VN')}</div>
                  )}
                </div>
              </Card>

              {/* Yêu cầu ứng viên */}
              <Card loading={loading} className=" shadow bg-white">
                <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">
                  Yêu cầu ứng viên
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cấp độ */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserOutlined className="text-[#6A5ACD] text-lg" />
                      <span className="text-sm text-gray-600">Cấp độ:</span>
                    </div>
                    <div className="font-semibold text-gray-900 bg-blue-50 px-3 py-1 rounded text-sm inline-block">
                      {getPositionLabel(currentJob.position)}
                    </div>
                  </div>

                  {/* Kinh nghiệm */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockCircleOutlined className="text-green-600 text-lg" />
                      <span className="text-sm text-gray-600">Kinh nghiệm:</span>
                    </div>
                    <div className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded text-sm inline-block">
                      {getExperienceLabel(currentJob.experience)}
                    </div>
                  </div>

                  {/* Học vấn */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOutlined className="text-purple-600 text-lg" />
                      <span className="text-sm text-gray-600">Học vấn:</span>
                    </div>
                    <div className="font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded text-sm inline-block">
                      {getAcademicLevelLabel(currentJob.academicLevel)}
                    </div>
                  </div>

                  {/* Loại công việc */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <SolutionOutlined className="text-orange-500 text-lg" />
                      <span className="text-sm text-gray-600">Loại công việc:</span>
                    </div>
                    <div className="font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded text-sm inline-block">
                      {getJobTypeLabel(currentJob.jobType)}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quyền lợi */}
              {currentJob.benefitsEnjoyed && (
                <Card loading={loading} className=" shadow bg-white">
                  <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">Quyền lợi</h3>
                  <div className="text-gray-700 text-base whitespace-pre-line">
                    {currentJob.benefitsEnjoyed}
                  </div>
                </Card>
              )}

              {/* Thông tin liên hệ */}
              <Card loading={loading} className=" shadow bg-white">
                <h3 className="font-bold text-xl text-gray-900 border-b-2 border-[#6A5ACD]/30 pb-2 mb-4">Thông tin liên hệ</h3>
                <div className="flex flex-col gap-4">
                  {currentJob.contactPersonEmail && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                      <MailOutlined className="text-[#6A5ACD] text-lg" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Email:</div>
                        <a href={`mailto:${currentJob.contactPersonEmail}`} className="font-semibold text-blue-600 hover:text-[#6A5ACD] underline">
                          {currentJob.contactPersonEmail}
                        </a>
                      </div>
                    </div>
                  )}
                  {currentJob.contactPersonPhone && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                      <PhoneOutlined className="text-[#6A5ACD] text-lg" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Hotline:</div>
                        <a href={`tel:${currentJob.contactPersonPhone}`} className="font-semibold text-blue-600 hover:text-[#6A5ACD] underline">
                          {currentJob.contactPersonPhone}
                        </a>
                      </div>
                    </div>
                  )}
                  {currentJob.contactPersonName && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                      <UserOutlined className="text-[#6A5ACD] text-lg" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Người liên hệ:</div>
                        <div className="font-semibold text-gray-900">{currentJob.contactPersonName}</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Cột phải: Việc tương tự */}
          <div className="w-full lg:w-[350px] flex flex-col gap-6 shrink-0">
            <Card
              loading={loading}
              title={<span className="font-semibold text-lg text-[#6A5ACD]">Việc làm tương tự</span>}
              className="shadow rounded-xl border border-gray-200 bg-white"
            >
              {similarJobs.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {similarJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      size="default"
                      onClick={(jobPostId) => {
                        navigate(ROUTE_PATH.JOB_DETAIL.replace(':jobPostId', jobPostId.toString()));
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có việc làm tương tự" />
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Job Modal */}
      <ApplyJobModal
        open={isApplyModalOpen}
        onCancel={() => setIsApplyModalOpen(false)}
        jobPost={currentJob || null}
      />
    </div>
  );
};

export default JobDetail;
