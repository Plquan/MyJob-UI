import { Card, Tag, Pagination } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const jobs = [
  {
    id: 1,
    title: 'Kiến Trúc Sư',
    company: 'CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY DỰNG – THƯƠNG MẠI',
    salary: '15 triệu - 20 triệu',
    location: 'Hà Nội',
    deadline: '01/05/2024',
    urgent: true,
    hot: true,
    logo: '/assets/job-logo-1.png',
  },
  {
    id: 2,
    title: 'Nhân Viên Lễ Tân',
    company: 'Công Ty CP Xây Dựng Newdaycons',
    salary: '7 triệu - 9 triệu',
    location: 'TP.HCM',
    deadline: '05/05/2024',
    urgent: true,
    hot: true,
    logo: '/assets/job-logo-2.png',
  },
  {
    id: 3,
    title: 'Nhân Viên Kinh Doanh Thu Nhập ...',
    company: 'Công Ty Cổ Phần Thanh Bình H.T.C Việt Nam',
    salary: '12 triệu - 20 triệu',
    location: 'Hà Nội',
    deadline: '31/07/2024',
    urgent: true,
    hot: true,
    logo: '/assets/job-logo-3.png',
  },
  {
    id: 4,
    title: 'Kỹ Sư Nông Nghiệp',
    company: 'Công Ty TNHH Ánh Dương Tây Nguyên',
    salary: '8 triệu - 15 triệu',
    location: 'Gia Lai',
    deadline: '21/09/2024',
    urgent: true,
    hot: false,
    logo: '/assets/job-logo-4.png',
  },
  {
    id: 5,
    title: 'Hub Supervisor - [Hải Phòng]',
    company: 'Công Ty TNHH Giao Hàng Flex Speed',
    salary: '10 triệu - 15 triệu',
    location: 'Hà Nội',
    deadline: '07/06/2024',
    urgent: true,
    hot: true,
    logo: '/assets/job-logo-5.png',
  },
  {
    id: 6,
    title: 'Kế Toán Bán Hàng',
    company: 'Công Ty Cổ Phần Đầu Tư Và Phát Triển Y Tế An Sinh',
    salary: '7 triệu - 12 triệu',
    location: 'Thanh Hóa',
    deadline: '22/11/2024',
    urgent: true,
    hot: true,
    logo: '/assets/job-logo-6.png',
  },
];

const PAGE_SIZE = 6;

const FeaturedJobsSection = () => {
  const [page, setPage] = useState(1);
  const pagedJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (

    <section className="bg-white py-8 px-2 mb-10 rounded-xl shadow-md mt-10 max-w-6xl mx-auto border border-gray-200">
      <div className="flex items-center justify-between bg-[#6A5ACD] font-bold text-xl text-white mb-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Việc làm tuyển gấp</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagedJobs.map(job => (
          <Card key={job.id} className="relative border border-gray-100 shadow hover:shadow-lg transition-all">
            <div className="flex gap-3 items-start">
              <img src={job.logo} alt={job.company} className="w-14 h-14 object-contain rounded-md border" />
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  {job.hot && <Tag color="red" className="font-bold">HOT</Tag>}
                  {job.urgent && <Tag color="gold" className="font-bold">Tuyển gấp</Tag>}
                </div>
                <div className="font-semibold text-base text-gray-900 mb-1 truncate" title={job.title}>{job.title}</div>
                <div className="text-sm text-gray-500 mb-1 truncate" title={job.company}>{job.company}</div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-1">
                  <span className="font-bold text-[#6A5ACD]">{job.salary}</span>
                  <span className="flex items-center gap-1"><EnvironmentOutlined /> {job.location}</span>
                  <span className="flex items-center gap-1"><CalendarOutlined /> {job.deadline}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={jobs.length}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </section>
  );
};

export default FeaturedJobsSection; 