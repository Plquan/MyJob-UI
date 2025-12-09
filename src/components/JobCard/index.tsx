import React, { useMemo } from 'react';
import { Button, Tag } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import type { IJobPost } from '../../types/job-post/JobPostType';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../stores';
import { jobPostActions } from '../../stores/jobPostStore/jobPostReducer';

interface JobCardProps {
  job: IJobPost;
  onClick?: (jobPostId: number) => void;
  size?: 'default' | 'large';
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, size = 'default' }) => {
  const isLarge = size === 'large';
  const dispatch = useDispatch<AppDispatch>();
  const { isSubmiting } = useSelector((state: RootState) => state.jobPostStore);
  const { provinces } = useSelector((state: RootState) => state.provinceStore);

  // Lấy tên tỉnh từ store
  const provinceName = useMemo(() => {
    if (!job.provinceId) return 'N/A';
    const province = provinces?.find(p => p.id === job.provinceId);
    return province?.name || 'N/A';
  }, [job.provinceId, provinces]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(jobPostActions.toggleSaveJobPost(job.id));
  };

  return (
    <div
      key={job.id}
      className={`bg-white border border-gray-200 rounded-lg flex flex-col shadow ${isLarge
        ? 'px-4 md:px-5 py-3 md:py-4 min-h-[100px] md:min-h-[120px]'
        : 'px-3 py-2 min-h-[80px]'
        }`}
    >
      <div className="flex flex-row items-start w-full min-w-0">
        <div className={`border-1 border-gray-300 bg-white flex items-center justify-center rounded-none shrink-0 ${isLarge
          ? 'w-12 h-12 md:w-14 md:h-14 mr-3 md:mr-4'
          : 'w-10 h-10 mr-2'
          }`}>
          <img
            src={job.company.logo}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-row items-center min-w-0">
            <span
              className={`font-semibold text-gray-900 truncate mr-2 cursor-pointer hover:text-[#6A5ACD] transition-colors ${isLarge
                ? 'text-base md:text-lg'
                : 'text-[15px]'
                }`}
              onClick={() => onClick?.(job.id)}
            >
              {job.jobName}
            </span>
            <div className={`flex flex-col items-end ${isLarge ? 'gap-1.5 md:gap-2' : 'gap-1'
              }`}>
              {job.isHot && (
                <Tag color="gold" className={`font-bold ${isLarge ? 'text-xs md:text-sm' : ''}`}>
                  Nổi bật
                </Tag>
              )}
              {job.isNew && (
                <Tag color="blue" className={`font-bold ${isLarge ? 'text-xs md:text-sm' : ''}`}>
                  Mới
                </Tag>
              )}
            </div>
          </div>
          <span className={`text-gray-600 truncate ${isLarge
            ? 'text-sm md:text-base mt-1 md:mt-1'
            : 'text-xs mt-1'
            }`}>
            {job.company.companyName}
          </span>
        </div>
      </div>
      <div className={`flex flex-wrap items-center justify-between ${isLarge
        ? 'gap-2 md:gap-3 text-xs md:text-sm mt-1.5 md:mt-3'
        : 'gap-2 text-xs mt-1.5'
        } text-gray-700`}>
        <div className={`flex flex-wrap items-center ${isLarge ? 'gap-2 md:gap-3' : 'gap-2'
          }`}>
          <span className={`font-bold text-[#6A5ACD] ${isLarge ? 'text-xs md:text-sm' : ''
            }`}>
            {job.salaryMin} - {job.salaryMax}
          </span>
          <span className="flex items-center gap-1">
            <EnvironmentOutlined className={isLarge ? 'text-xs md:text-sm' : 'text-[13px]'} />
            <span className={isLarge ? 'text-xs md:text-sm' : ''}>{provinceName}</span>
          </span>
          <span className="flex items-center gap-1">
            <CalendarOutlined className={isLarge ? 'text-xs md:text-sm' : 'text-[13px]'} />
            <span className={isLarge ? 'text-xs md:text-sm' : ''}>
              {job.deadline ? new Date(job.deadline).toLocaleDateString() : ''}
            </span>
          </span>
        </div>

        <Button
          onClick={handleToggleSave}
          shape="circle"
          size="small"
          loading={isSubmiting}
          className="bg-gray-200! border-gray-200!"
          icon={(job.isSaved ? <HeartFilled className="text-[#6A5ACD]!" /> : <HeartOutlined/>)}
        >
        </Button>
    
      </div>
    </div>
  );
};

export default JobCard;
