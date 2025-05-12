import { Input, Select, Button, Card, Avatar } from "antd";
import { CarryOutOutlined, EnvironmentOutlined, FlagOutlined, SearchOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import Footer from "../../layouts/components/footer";
import DefaultHeader from "../../layouts/components/headers/DefaultHeader";
import CompanyForm from "./components/CompanyForm";
const { Option } = Select;

const companies = [
    {
      id: 1,
      cover: 'https://via.placeholder.com/400x150/00ff99/ffffff?text=GSI+Banner',
      logoText: 'GSI',
      followers: 1,
      name: 'GSI GROUP LIMITED',
      industry: 'Gia công phần mềm',
      location: 'TP.HCM',
      employees: '500-1000 nhân viên',
      jobs: '1 việc làm'
    },
    {
      id: 2,
      cover: 'https://via.placeholder.com/400x150/ff6600/ffffff?text=Khang+Duy',
      logoText: 'KD',
      followers: 0,
      name: 'Công Ty TNHH Dược Phẩm Khang Duy',
      industry: 'Kế toán',
      location: 'TP.HCM',
      employees: '10000+ nhân viên',
      jobs: '1 việc làm'
    },
    {
      id: 3,
      cover: 'https://via.placeholder.com/400x150/0033cc/ffffff?text=Bidicomed',
      logoText: 'BD',
      followers: 0,
      name: 'Công Ty Cổ Phần Bidicomed',
      industry: 'Kinh doanh',
      location: 'Cần Thơ',
      employees: '1000+ nhân viên',
      jobs: '1 việc làm'
    },
    // Bạn có thể thêm nhiều hơn...
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
<div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto">
  <h2 className="text-lg font-extrabold mb-5">
    <span className="text-red-500">{companies.length}</span> công ty
  </h2>

  {/* Grid 3 cột, responsive */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {companies.map(company => (
      <Card
        key={company.id}
        hoverable
        className="border rounded-lg overflow-hidden"
        style={{ width: '100%' }}  // 100% để card giãn full width của grid cell
      >
        {/* Banner + overlay */}
        <div className="relative">
          <img
            alt="cover"
            src={company.cover}
            className="w-full h-36 object-cover"
          />
          {/* Avatar */}
          <div className="absolute left-4 -bottom-8">
            <Avatar
              size={64}
              style={{ backgroundColor: '#000', border: '2px solid #fff' }}
            >
              {company.logoText}
            </Avatar>
          </div>
          {/* Follower count */}
          <div className="absolute right-4 top-4 flex items-center text-gray-600 text-sm">
            <UsergroupAddOutlined />
            <span className="ml-1">{company.followers} lượt theo dõi</span>
          </div>
        </div>

        {/* Nội dung dưới banner */}
        <div className="pt-10 px-4 pb-4">
          <h3 className="font-semibold text-lg">{company.name}</h3>

          <div className="mt-3 space-y-2 text-gray-600 text-sm">
            <div className="flex items-center">
              <FlagOutlined />
              <span className="ml-2">{company.industry}</span>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined />
              <span className="ml-2">{company.location}</span>
            </div>
            <div className="flex items-center">
              <TeamOutlined />
              <span className="ml-2">{company.employees}</span>
            </div>
            <div className="flex items-center">
              <CarryOutOutlined />
              <span className="ml-2">{company.jobs}</span>
            </div>
          </div>

          <Button
            block
            style={{
              backgroundColor: '#F17F01',
              borderColor: '#F17F01',
              color: '#fff',
              marginTop: 16,
            }}
          >
            Đang theo dõi
          </Button>
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
