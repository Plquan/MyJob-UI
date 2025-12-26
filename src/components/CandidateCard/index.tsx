import React, { useMemo } from 'react';
import { Tag } from 'antd';
import { EnvironmentOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import type { IResume } from '../../types/resume/ResumeType';
import { useSelector } from 'react-redux';
import type { RootState } from '../../stores';
import { EXPERIENCE_OPTIONS } from '../../constant/selectOptions';

interface CandidateCardProps {
  resume: IResume;
  onClick?: (resumeId: number) => void;
  size?: 'default' | 'large';
}

const CandidateCard: React.FC<CandidateCardProps> = ({ resume, onClick, size = 'default' }) => {
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
      className={`bg-white border-2 border-gray-200 rounded-lg flex flex-col hover:border-[#154C91] cursor-pointer ${
        isLarge
          ? 'px-4 md:px-5 py-3 md:py-4 min-h-[100px] md:min-h-[120px]'
          : 'px-3 py-2 min-h-[80px]'
      }`}
      onClick={() => onClick?.(resume.id)}
    >
      <div className="flex flex-row items-start w-full min-w-0">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-row items-center min-w-0">
            <span
              className={`font-semibold text-gray-900 truncate mr-2 hover:text-[#6A5ACD] transition-colors ${
                isLarge ? 'text-base md:text-lg' : 'text-[15px]'
              }`}
            >
              {resume.candidate?.fullName || 'N/A'}
              {age ? `(${age} tuổi)` : ''}
            </span>
          </div>
          <span
            className={`text-gray-600 truncate ${
              isLarge ? 'text-sm md:text-base mt-1 md:mt-1' : 'text-xs mt-1'
            }`}
          >
            {careerName|| 'Chưa có tiêu đề'}
          </span>
        </div>
      </div>
      <div
        className={`flex flex-wrap items-center justify-between ${
          isLarge ? 'gap-2 md:gap-3 text-xs md:text-sm mt-1.5 md:mt-3' : 'gap-2 text-xs mt-1.5'
        } text-gray-700`}
      >
        <div className={`flex flex-wrap items-center ${isLarge ? 'gap-2 md:gap-3' : 'gap-2'}`}>
          {resume.salaryMin && resume.salaryMax && (
            <span className={`flex items-center gap-1 font-semibold text-[#6A5ACD] ${isLarge ? 'text-xs md:text-sm' : ''}`}>
              <DollarOutlined className={isLarge ? 'text-xs md:text-sm' : 'text-[13px]'} />
              {resume.salaryMin} - {resume.salaryMax}
            </span>
          )}
          <span className="flex items-center gap-1">
            <EnvironmentOutlined className={isLarge ? 'text-xs md:text-sm' : 'text-[13px]'} />
            <span className={isLarge ? 'text-xs md:text-sm' : ''}>{provinceName}</span>
          </span>
          <span className={isLarge ? 'text-xs md:text-sm' : ''}>{experienceLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;

