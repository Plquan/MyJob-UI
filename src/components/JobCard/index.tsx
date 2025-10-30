import React from 'react';
import { Tag } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    deadline: string;
    urgent: boolean;
    hot: boolean;
    logo: string;
  };
  onClick?: (job: any) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div
      key={job.id}
      className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex flex-col min-h-[80px] cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(job)}
    >
      <div className="flex flex-row items-start w-full min-w-0">
        <div className="w-10 h-10 border-2 border-gray-300 bg-white flex items-center justify-center rounded-none mr-2 shrink-0">
          <img
            src={job.logo}
            alt={job.company}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-row items-center min-w-0">
            <span className="font-semibold text-[15px] text-gray-900 truncate max-w-[110px]">{job.title}</span>
            <div className="flex gap-1 ml-2">
              {job.hot && (
                <Tag color="red" className="font-bold uppercase px-1 py-0 text-[10px] ml-2">HOT</Tag>
              )}
              {job.urgent && (
                <Tag color="gold" className="font-bold uppercase px-1 py-0 text-[10px] ml-1">Tuyển gấp</Tag>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-600 truncate max-w-[180px] mt-0.5">{job.company}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-700 items-center mt-2">
        <span className="font-bold text-[#6A5ACD]">{job.salary}</span>
        <span className="flex items-center gap-1">
          <EnvironmentOutlined className="text-[13px]" /> 
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <CalendarOutlined className="text-[13px]" /> 
          {job.deadline}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
