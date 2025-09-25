import { Input, Select, Button, Card, Avatar, Spin } from "antd";
import { CarryOutOutlined, EnvironmentOutlined, FlagOutlined, SearchOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTE_PATH from "../../../routes/routePath";
import { companyActions } from "../../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../../stores";
import type { ICompanyWithImagesData } from "../../../types/company/CompanyType";
import { FileType } from "../../../constant/fileType";
const { Option } = Select;

const getCompanyLogo = (company: ICompanyWithImagesData): string => {
  const logoImage = company.images?.find(img => img.fileType === FileType.LOGO);
  return logoImage?.url || '/assets/vinhuni.png';
};

const getCompanyCover = (company: ICompanyWithImagesData): string => {
  const coverImage = company.images?.find(img => img.fileType === FileType.COVER_IMAGE);
  return coverImage?.url || '/assets/hiring-banner.png';
};
  
const CompanyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading } = useSelector((state: RootState) => state.companyStore);

  useEffect(() => {
    dispatch(companyActions.getCompanies());
  }, [dispatch]);

  return (
    <>
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

<div className="bg-white p-4 rounded-xl shadow-md max-w-4xl mx-auto">
  <h2 className="text-base font-bold mb-4">
    <span className="text-red-500">{companies.length}</span> công ty
  </h2>

  {loading ? (
    <div className="flex justify-center items-center py-8">
      <Spin size="large" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((company: ICompanyWithImagesData) => (
    <Card
    key={company.company.id}
    hoverable
    className="rounded-lg shadow-sm border"
    onClick={() => navigate(ROUTE_PATH.COMPANY_DETAIL)}
  >
    <div className="relative">
      <img
        alt="cover"
        src={getCompanyCover(company)}
        className="w-full h-28 object-cover rounded-t-lg"
      />
  
      <div className="absolute right-3 top-2 flex items-center text-xs text-gray-600">
        <UsergroupAddOutlined style={{ fontSize: 14 }} />
        <span className="ml-1">0 lượt theo dõi</span>
      </div>
  
      <div className="absolute left-3 -bottom-6">
        <div className="bg-white p-1 rounded-md shadow-md">
          <Avatar
            size={48}
            src={getCompanyLogo(company)}
            style={{ backgroundColor: '#fff' }}
            icon={<UserOutlined />}
          />
        </div>
      </div>
    </div>
  
    <div className="pt-8">
      <h3 className="text-base font-semibold mb-1">{company.company.companyName}</h3>
      <div className="space-y-1 text-gray-600 text-xs">
        <div className="flex items-center">
          <FlagOutlined className="text-sm" />
          <span className="ml-2">{company.company.fieldOperation || 'Chưa cập nhật'}</span>
        </div>
        <div className="flex items-center">
          <EnvironmentOutlined className="text-sm" />
          <span className="ml-2">{company.company.address}</span>
        </div>
        <div className="flex items-center">
          <TeamOutlined className="text-sm" />
          <span className="ml-2">{company.company.employeeSize ? `${company.company.employeeSize}+ nhân viên` : 'Chưa cập nhật'}</span>
        </div>
        <div className="flex items-center">
          <CarryOutOutlined className="text-sm" />
          <span className="ml-2">0 việc làm</span>
        </div>
      </div>
    </div>
  </Card>
  
    ))}
    </div>
  )}
</div>

</div>

    </>
  );
};

export default CompanyPage;
