import React, { useMemo } from 'react';
import { EnvironmentOutlined, DollarOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import type { IResume } from '../../types/resume/ResumeType';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores';
import { EXPERIENCE_OPTIONS } from '../../constant/selectOptions';

interface CandidateCardProps {
  resume: IResume;
  onClick?: (resumeId: number) => void;
  size?: 'default' | 'large';
  onToggleSave?: (resumeId: number, event: React.MouseEvent) => void;
  isSaved?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ resume, onClick, size = 'default', onToggleSave, isSaved = false }) => {
  const isLarge = size === 'large';
  const { provinces } = useSelector((state: RootState) => state.provinceStore);
  const { careers } = useSelector((state: RootState) => state.careerStore);

  const provinceName = useMemo(() => {
    if (!resume.provinceId) return 'N/A';
    const province = provinces?.find(p => p.id === resume.provinceId);
    return province?.name || 'N/A';
  }, [resume.provinceId, provinces]);

  const careerName = useMemo(() => {
    if (!resume.careerId) return 'N/A';
    const career = careers?.find(c => c.id === resume.careerId);
    return career?.name || 'N/A';
  }, [resume.careerId, careers]);

  const experienceLabel = useMemo(() => {
    if (!resume.experience) return 'N/A';
    const exp = EXPERIENCE_OPTIONS.find(e => e.value === resume.experience);
    return exp?.label || 'N/A';
  }, [resume.experience]);

  const age = useMemo(() => {
    if (!resume.candidate?.birthday) return undefined;
    const today = new Date();
    const birthDate = new Date(resume.candidate.birthday);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  }, [resume.candidate?.birthday]);

  return (
    <div
      key={resume.id}
      className={`bg-white border-1 border-gray-300 rounded-lg flex flex-col hover:border-[#154C91] cursor-pointer ${isLarge
        ? 'px-2 md:px-3 py-1 md:py-2 min-h-[80px] md:min-h-[100px]'
        : 'px-2 py-1 min-h-[80px]'
        }`}
      onClick={() => onClick?.(resume.id)}
    >
      <div className="flex flex-row items-start w-full min-w-0">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-row items-center min-w-0">
            <span
              className={`font-[500] truncate mr-2 hover:text-[#6A5ACD] transition-colors ${isLarge ? 'text-[14px] md:text-[17px]' : 'text-[15px]'
                }`}
            >
              {resume.candidate?.fullName}
              {age ? `(${age} tuổi)` : ''}
            </span>
          </div>
          <span
            className={`truncate ${isLarge ? 'text-[13px] md:text-[14px]' : 'text-[13px]'
              }`}
          >
            {careerName || 'Chưa có tiêu đề'}
          </span>
        </div>
        {onToggleSave && (
          <div
            className="flex items-center justify-center ml-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(resume.id, e);
            }}
          >
            {isSaved ? (
              <HeartFilled className="text-red-500 text-lg hover:text-red-600" />
            ) : (
              <HeartOutlined className="text-gray-400 text-lg hover:text-red-500" />
            )}
          </div>
        )}
      </div>
      <div
        className={`flex flex-wrap items-center justify-between ${isLarge ? 'gap-2 md:gap-3 text-xs md:text-sm mt-1.5 md:mt-2' : 'gap-2 text-xs mt-1.5'
          } text-gray-700`}
      >
        <div className={`flex flex-wrap items-center ${isLarge ? 'gap-2 md:gap-3' : 'gap-2'}`}>
          {resume.salaryMin && resume.salaryMax && (
            <span className={`flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full ${isLarge ? 'text-[10px] md:text-[11px]' : 'text-[11px]'}`}>
              <DollarOutlined className={isLarge ? 'text-[10px] md:text-[11px]' : 'text-[11px]'} />
              {resume.salaryMin} - {resume.salaryMax}
            </span>
          )}
          <span className={`flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full ${isLarge ? 'text-[10px] md:text-[11px]' : 'text-[11px]'}`}>
            <EnvironmentOutlined className={isLarge ? 'text-[10px] md:text-[11px]' : 'text-[13px]'} />
            <span className={isLarge ? 'text-[10px] md:text-[11px]' : ''}>{provinceName}</span>
          </span>
          <span className={`bg-gray-100 px-2 py-1 rounded-full ${isLarge ? 'text-[10px] md:text-[11px]' : 'text-[11px]'}`}>{experienceLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;

