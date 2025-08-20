import React from 'react';
import { Card, Button, List } from 'antd';
import { MailOutlined, PhoneOutlined, HeartOutlined, EnvironmentOutlined, CalendarOutlined, DollarOutlined, UserOutlined, BookOutlined, SolutionOutlined, ClockCircleOutlined } from '@ant-design/icons';

const similarJobs = [
  {
    title: 'Nhân Viên Kỹ Thuật FPT Telecom - Q. Tân Bình',
    company: 'FPT Telecom',
    location: 'Thành phố Hồ Chí Minh',
    salary: '10.000.000 đ',
  },
  {
    title: 'Chuyên Viên Kinh Doanh Kênh Phân Phối B2C',
    company: 'FPT Telecom',
    location: 'Thành phố Hồ Chí Minh',
    salary: '20.000.000 đ',
  },
  {
    title: 'Tuyển dụng Frontend Developer (React.js)',
    company: 'FPT Telecom',
    location: 'Thành phố Hà Nội',
    salary: '15.000.000 đ',
  },
  {
    title: 'Tuyển Business Analyst (BA)',
    company: 'FPT Telecom',
    location: 'Thành phố Hà Nội',
    salary: '22.000.000 đ',
  },
];

const JobDetail = () => {
  return (
    <div className=" min-h-screen flex justify-center py-8">
      <div className="w-full max-w-5xl flex gap-6">
        {/* Cột trái: Chi tiết công việc */}
        <div className="flex-1 flex flex-col gap-6">
          {/* HEADER */}
          <Card className="rounded-xl shadow p-0 border border-[#e0c6e6] bg-white">
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 p-6 pb-2">
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src="https://media3.scdn.vn/img4/2020/05_27/6Qw2QwQkQwQwQwQwQwQw_simg_de2fe0_250x250_maxb.jpg" alt="Sendo" className="w-24 h-24 rounded-xl object-contain border border-[#e0c6e6] bg-white" />
              </div>
              <div className="flex-1 flex flex-col justify-center md:justify-between md:flex-row md:items-center gap-2">
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <h2 className="text-2xl font-bold text-[#222] mb-1">Senior Embedded Engineer</h2>
                  <div className="text-[#a259c6] font-semibold mb-1">Sendo JSC</div>
                  <div className="flex flex-wrap gap-4 text-[#6c6c6c] text-sm mb-1">
                  <span className="flex items-center text-[#a259c6]"> 45.000.000 đ</span>
                    <span className="flex items-center"><EnvironmentOutlined className="mr-1" />Đà Nẵng</span>
                    <span className="flex items-center"><CalendarOutlined className="mr-1" />Hết hạn: 2/1/2026</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 px-6 pb-6 pt-2">
              <Button type="primary" className="bg-[#a259c6] px-8 font-semibold text-base h-10">Nộp đơn ngay</Button>
              <Button icon={<HeartOutlined />} className="border-[#a259c6] text-[#a259c6] font-semibold h-10">Lưu tin</Button>
            </div>
          </Card>
          {/* Mô tả công việc */}
          <div className="rounded-xl shadow border border-[#e0c6e6] bg-white p-0 ">
            <div className="px-6 py-6 ">
             <Card className="rounded-xl shadow border border-[#e0c6e6] bg-white p-0 mb-3! ">
             <h3 className="font-bold text-xl text-[#222] border-b-2 border-[#a259c6]/30 pb-2 mb-4">Mô tả công việc</h3>
              <div className="text-[#222] text-base mb-6">
                Embedded Systems Engineer. Yêu cầu:<br />
                - 5+ năm kinh nghiệm embedded systems<br />
                - C/C++<br />
                - RTOS<br />
                - Hardware Interfaces<br />
                - IoT Protocols
              </div>
             </Card>
              {/* Thông tin chi tiết */}
              <Card className="rounded-xl shadow border border-[#e0c6e6] bg-white mb-3!">
              <h3 className="font-bold text-xl text-[#222] border-b-2 border-[#a259c6]/30 pb-2 mb-4">Thông tin chi tiết</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-base text-[#222] mb-6">
                <div><span className="font-semibold">Mã công việc:</span> JOB-00048</div>
                <div><span className="font-semibold">Chức danh:</span> Software Developer</div>
                <div><span className="font-semibold">Ngành nghề:</span> IT & Telecommunications</div>
                <div><span className="font-semibold">Địa điểm:</span> Đà Nẵng</div>
                <div><span className="font-semibold">Mức lương:</span> <span className="text-[#a259c6] font-bold">45.000.000 đ</span></div>
              </div>
             </Card>

              {/* Yêu cầu ứng viên */}
              <Card className="rounded-xl shadow border border-[#e0c6e6] bg-white mb-3 p-6">
            <h3 className="font-bold text-xl text-[#222] border-b border-[#a259c6]/30 pb-2 mb-4">
                Yêu cầu ứng viên
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Cấp độ */}
                <div className="bg-[#faf8fc] border border-[#e0c6e6] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <UserOutlined className="text-[#a259c6]! text-lg" />
                    <span className="text-xs text-[#888]">Cấp độ:</span>
                </div>
                <div className="font-semibold text-[#222] bg-[#e6f4ff] px-2 py-1 rounded text-sm inline-block">
                    Nhân viên cao cấp
                </div>
                </div>

                {/* Kinh nghiệm */}
                <div className="bg-[#f6fdf6] border border-[#e0c6e6] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <ClockCircleOutlined className="text-[#52c41a]! text-lg!" />
                    <span className="text-sm font-medium">Kinh nghiệm:</span>
                </div>
                <div className="font-semibold text-[#52c41a] bg-[#e6fffb] px-2 py-1 rounded text-sm inline-block">
                    5-10 năm
                </div>
                </div>

                {/* Học vấn */}
                <div className="bg-[#f9f6fd] border border-[#e0c6e6] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <BookOutlined className="text-[#722ed1] text-lg" />
                    <span className="text-xs text-[#888]">Học vấn:</span>
                </div>
                <div className="font-semibold text-[#722ed1] bg-[#f9f0ff] px-2 py-1 rounded text-sm inline-block">
                    Đại học
                </div>
                </div>

                {/* Loại công việc */}
                <div className="bg-[#fff9f6] border border-[#e0c6e6] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <SolutionOutlined className="text-[#faad14] text-lg" />
                    <span className="text-xs text-[#888]">Loại công việc:</span>
                </div>
                <div className="font-semibold text-[#faad14] bg-[#fffbe6] px-2 py-1 rounded text-sm inline-block">
                    Toàn thời gian
                </div>
                </div>

            </div>
            </Card>


              {/* Thông tin liên hệ */}
              <Card className="rounded-xl shadow border border-[#e0c6e6] bg-white p-0">
              <h3 className="font-bold text-xl text-[#222] border-b-2 border-[#a259c6]/30 pb-2 mb-4">Thông tin liên hệ</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-[#f6fafd] border border-[#e0c6e6] rounded-lg p-3 flex items-center gap-2">
                  <MailOutlined className="text-[#a259c6] text-lg" />
                  <div>
                    <div className="text-xs text-[#888] mb-1">Email:</div>
                    <a href="mailto:careers@sendo.vn" className="font-semibold text-[#1677ff] hover:text-[#a259c6] underline">careers@sendo.vn</a>
                  </div>
                </div>
                <div className="bg-[#f6fafd] border border-[#e0c6e6] rounded-lg p-3 flex items-center gap-2">
                  <PhoneOutlined className="text-[#a259c6] text-lg" />
                  <div>
                    <div className="text-xs text-[#888] mb-1">Hotline:</div>
                    <a href="tel:19001090" className="font-semibold text-[#1677ff] hover:text-[#a259c6] underline">19001090</a>
                  </div>
                </div>
            
              </div>
              </Card>
            </div>
          </div>
        </div>
        {/* Cột phải: Việc tương tự */}
        <div className="w-[350px] min-w-[300px] flex flex-col gap-6">
          <Card title={<span className="font-semibold text-lg text-[#a259c6]">Việc tương tự</span>} className="shadow rounded-xl border border-[#e0c6e6] bg-white">
            <List
              itemLayout="vertical"
              dataSource={similarJobs}
              renderItem={item => (
                <List.Item className="border-b last:border-b-0 py-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-base text-[#222]">{item.title}</span>
                    <span className="text-[#6c6c6c] text-sm">{item.company} · {item.location}</span>
                    <span className="text-[#a259c6] font-bold">{item.salary}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
