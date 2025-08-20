import { Select, Typography, Card, Breadcrumb, Empty } from 'antd';
import AdvancedFilter from './components/AdvancedFilter';
import HeartOutlined from '@ant-design/icons/lib/icons/HeartOutlined';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../routes/routePath';
const { Title } = Typography;


const jobs:any[] = [
  {
    id: 1,
    title: 'Tuyển dụng Frontend Developer (React.js)',
    company: 'FPT Telecom',
    salary: '15.000.000 đ',
    location: 'Thành phố Hà Nội',
    postedAgo: '5 ngày trước',
    logo: '/assets/vinhuni.png',
  },
  {
    id: 2,
    title: 'Tuyển dụng Frontend Developer (React.js)',
    company: 'FPT Telecom',
    salary: '15.000.000 đ',
    location: 'Thành phố Hà Nội',
    postedAgo: '5 ngày trước',
    logo: '/assets/vinhuni.png',
  },
];

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

  return (
    <>
      <AdvancedFilter />
      <div className="max-w-7xl mx-auto p-5 pt-10 flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          
        <div className='rounded-lg bg-white border-2 border-gray-100 p-3'>
          {/* Breadcrumb nằm trên */}
          <Breadcrumb className="mb-2! text-purple-800" items={breadcrumbItems} />

          {/* Title bên dưới */}
          <Title level={2} className=' font-bold!'>
            Tuyển dụng <span className='text-[#6A5ACD]!'>0</span> việc làm mới nhất năm <span className="text-[#6A5ACD]! font-bold">2024</span>
          </Title>
        </div>


          <div className="flex justify-between items-center mb-5 mt-5">
            <div><span className="font-semibold">{jobs.length}</span><span> việc làm</span></div> 
            <Select defaultValue="newest" className="w-40">
              <Select.Option value="newest">Mới nhất</Select.Option>
            </Select>
          </div>

          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="mb-3! cursor-pointer shadow-sm hover:shadow-md transition-all duration-300" onClick={() => navigate(ROUTE_PATH.JOB_DETAIL)}>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img src={job.logo} alt={job.company} className="w-16 h-12 object-contain" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{job.title}</h3>
                      <div className="text-sm text-gray-500">{job.company}</div>
                      <div className="text-sm mt-1">
                        <span className="text-purple-600 font-bold">{job.salary}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-600">{job.location}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500">{job.postedAgo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[#6A5ACD]! text-sm cursor-pointer self-end mt-auto flex items-center gap-1">
                  <HeartOutlined />
                  Lưu
                </div>
                </div>
              </Card>
            ))
          )}

        </div>
        {/* Sidebar */}
        <div className="w-[320px] flex flex-col gap-6">
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
