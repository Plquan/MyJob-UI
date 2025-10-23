import { Pagination } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import JobCard from '../../../components/JobCard';

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
    logo: '/assets/vinhuni.png',
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
    logo: '/assets/vinhuni.png',
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
    logo: '/assets/vinhuni.png',
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
    logo: '/assets/vinhuni.png',
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
    logo: '/assets/vinhuni.png',
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
     logo: '/assets/vinhuni.png',
  },
];

const PAGE_SIZE = 6;

const FeaturedJobsSection = () => {
  const [page, setPage] = useState(1);
  const pagedJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10">
      <div className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] rounded-t-xl flex items-center gap-3 px-6 py-3">
        <span className="bg-white/80 rounded-full p-1 flex items-center justify-center">
          <ClockCircleOutlined className="text-[#bfa94a] text-lg" />
        </span>
        <h2 className="text-lg md:text-xl font-bold text-white">Việc làm tuyển gấp</h2>
      </div>
      <section className="bg-white py-4 px-2 rounded-b-xl shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {pagedJobs.map(job => (
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
            current={page}
            pageSize={PAGE_SIZE}
            total={jobs.length}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      </section>
    </div>
  );
};

export default FeaturedJobsSection; 