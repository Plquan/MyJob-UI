import { Input, Select, Button, Card, Avatar } from "antd";
import { CarryOutOutlined, EnvironmentOutlined, FlagOutlined, SearchOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import Footer from "../../layouts/components/footer/DefaultFooter";
import DefaultHeader from "../../layouts/components/headers/DefaultHeader";
import CompanyForm from "./components/CompanyForm";
const { Option } = Select;

const companies = [
    {
      id: 1,
      cover: '/assets/hiring-banner.png',
      logo: '/assets/vinhuni.png',
      followers: 1,
      name: 'GSI GROUP LIMITED',
      industry: 'Gia công phần mềm',
      location: 'TP.HCM',
      employees: '500-1000 nhân viên',
      jobs: '1 việc làm'
    },
    {
      id: 2,
      cover: '/assets/hiring-banner.png',
      logo: '/assets/vinhuni.png',
      followers: 0,
      name: 'Công Ty TNHH Dược Phẩm Khang Duy',
      industry: 'Kế toán',
      location: 'TP.HCM',
      employees: '10000+ nhân viên',
      jobs: '1 việc làm'
    },
    {
      id: 3,
      cover: '/assets/hiring-banner.png',
      logo: '/assets/vinhuni.png',
      followers: 0,
      name: 'Công Ty Cổ Phần Bidicomed',
      industry: 'Kinh doanh',
      location: 'Cần Thơ',
      employees: '1000+ nhân viên',
      jobs: '1 việc làm'
    },
    {
      id: 4,
      cover: '/assets/hiring-banner.png',
      logo: '/assets/vinhuni.png',
      followers: 0,
      name: 'Công Ty Cổ Phần Bidicomed',
      industry: 'Kinh doanh',
      location: 'Cần Thơ',
      employees: '1000+ nhân viên',
      jobs: '1 việc làm'
    },
  ];
  

const CompanyPage = () => {
  return (
    <>
     <DefaultHeader />
<div className="min-h-screen p-6">
  <div className="max-w-4xl mx-auto mb-8">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#6A5ACD]">Nhà tuyển dụng hàng đầu</h1>
    </div>

    <div className="flex items-center  gap-2 rounded-lg">
      <Input placeholder="GSI" allowClear className="w-80!" />
      <Select defaultValue="Tất cả tỉnh thành" className="w-44">
        <Option value="all">Tất cả tỉnh thành</Option>
        <Option value="hcm">TP.HCM</Option>
        <Option value="hn">Hà Nội</Option>
      </Select>
      <Button type="primary" icon={<SearchOutlined />} className="px-4 h-10 flex items-center">
        Tìm Kiếm
      </Button>
    </div>
  </div>

  {/* Công ty nổi bật */}
{/* Công ty nổi bật */}
<div className="bg-white p-4 rounded-xl shadow-md max-w-4xl mx-auto">
  <h2 className="text-base font-bold mb-4">
    <span className="text-red-500">{companies.length}</span> công ty
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {companies.map(company => (
    <Card
    key={company.id}
    hoverable
    className="rounded-lg shadow-sm border"
  >
    {/* Banner + Avatar + Follow */}
    <div className="relative">
      <img
        alt="cover"
        src={company.cover}
        className="w-full h-28 object-cover rounded-t-lg"
      />
  
      {/* Follower count */}
      <div className="absolute right-3 top-2 flex items-center text-xs text-gray-600">
        <UsergroupAddOutlined style={{ fontSize: 14 }} />
        <span className="ml-1">{company.followers} lượt theo dõi</span>
      </div>
  
      {/* Logo */}
      <div className="absolute left-3 -bottom-6">
        <div className="bg-white p-1 rounded-md shadow-md">
          <Avatar
            size={48}
            src={company.logo}
            style={{ backgroundColor: '#fff' }}
            icon={<UserOutlined />}
          />
        </div>
      </div>
    </div>
  
    {/* Nội dung */}
    <div className="pt-8">
      <h3 className="text-base font-semibold mb-1">{company.name}</h3>
      <div className="space-y-1 text-gray-600 text-xs">
        <div className="flex items-center">
          <FlagOutlined className="text-sm" />
          <span className="ml-2">{company.industry}</span>
        </div>
        <div className="flex items-center">
          <EnvironmentOutlined className="text-sm" />
          <span className="ml-2">{company.location}</span>
        </div>
        <div className="flex items-center">
          <TeamOutlined className="text-sm" />
          <span className="ml-2">{company.employees}</span>
        </div>
        <div className="flex items-center">
          <CarryOutOutlined className="text-sm" />
          <span className="ml-2">{company.jobs}</span>
        </div>
      </div>
    </div>
  </Card>
  
    ))}
  </div>
</div>


</div>
<Footer />

    </>
  );
};

export default CompanyPage;
