import { Card, Avatar, Button } from "antd";
import { CarryOutOutlined, EnvironmentOutlined, FlagOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { ICompanyWithImagesData } from "../../types/company/CompanyType";
import { FileType } from "../../constant/fileType";
import ROUTE_PATH from "../../routes/routePath";
import { companyActions } from "../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../stores";
import { BookmarkIcon } from "../../assets/icon/bookmark";
import { useAuthorization } from "../../ultils/hooks/useAuthorization";
import { EUserRole } from "../../constant/role";

interface CompanyItemProps {
  company: ICompanyWithImagesData;
}

const getCompanyLogo = (company: ICompanyWithImagesData): string => {
  const logoImage = company.images?.find(img => img.fileType === FileType.LOGO);
  return logoImage?.url || '/assets/vinhuni.png';
};

const getCompanyCover = (company: ICompanyWithImagesData): string => {
  const coverImage = company.images?.find(img => img.fileType === FileType.COVER_IMAGE);
  return coverImage?.url || '/assets/hiring-banner.png';
};

const CompanyItem = ({ company }: CompanyItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { submitting } = useSelector((state: RootState) => state.companyStore);
  const companySubmiting = submitting.followCompany[company.company.id] ?? false;
  const { requireCandidate } = useAuthorization([EUserRole.CANDIDATE]);

  // Kiểm tra công ty còn hot (chưa hết hotExpiredAt)
  const isHot = company.company.hotExpiredAt 
    ? new Date() < new Date(company.company.hotExpiredAt) 
    : false;

  const handleToggleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireCandidate()) {
      return;
    }
    await dispatch(companyActions.toggleFollowCompany(company.company.id)).unwrap();
  };

  return (
    <Card
      key={company.company.id}
      className={`border-1! h-full flex flex-col ${
        isHot 
          ? 'border-gray-300! bg-gradient-to-br! from-[rgb(0,0,0)]! to-[rgb(123,104,238)]! shadow-md' 
          : 'border-gray-300!'
      }`}
      styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
    >
      <div className="relative">
        <img
          alt="cover"
          src={getCompanyCover(company)}
          className="w-full h-28 object-cover rounded-t-lg border-1! border-gray-200!"
        />

        <div className="absolute left-3 -bottom-6">
          <div className="bg-white p-1 rounded-md shadow-md border-1! border-gray-200!">
            <Avatar
              size={48}
              shape="square"
              src={getCompanyLogo(company)}
              style={{ backgroundColor: '#fff' }}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </div>

      <div className={`flex justify-end items-center text-xs mt-2 ${isHot ? 'text-white' : 'text-gray-600'}`}>
        <UsergroupAddOutlined style={{ fontSize: 14, color: isHot ? 'white' : undefined }} />
        <span className="ml-1">0 lượt theo dõi</span>
      </div>

      <div className="pt-3 flex flex-col flex-1">
        <h3 className={`text-xl font-semibold mb-1 cursor-pointer ${isHot ? 'text-white' : ''}`} onClick={() => navigate(ROUTE_PATH.COMPANY_DETAIL.replace(':companyId', company.company.id.toString()))}>{company.company.companyName}</h3>
        <div className={`space-y-1 text-xs ${isHot ? 'text-white' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <FlagOutlined className="text-sm" style={{ color: isHot ? 'white' : undefined }} />
            <span className="ml-2">{company.company.fieldOperation || 'Chưa cập nhật'}</span>
          </div>
          <div className="flex items-center">
            <EnvironmentOutlined className="text-sm" style={{ color: isHot ? 'white' : undefined }} />
            <span className="ml-2">{company.company.address}</span>
          </div>
          <div className="flex items-center">
            <TeamOutlined className="text-sm" style={{ color: isHot ? 'white' : undefined }} />
            <span className="ml-2">{company.company.employeeSize ? `${company.company.employeeSize}+ nhân viên` : 'Chưa cập nhật'}</span>
          </div>
          <div className="flex items-center">
            <CarryOutOutlined className="text-sm" style={{ color: isHot ? 'white' : undefined }} />
            <span className="ml-2">0 việc làm</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={handleToggleFollow}
            loading={companySubmiting}
            icon={company.isFollowed ? <BookmarkIcon className="w-4 h-4" stroke="white" fill="white" /> : <BookmarkIcon className="w-4 h-4" />

            }
            className={`w-full hover:border-1 hover:border-[#154C91]! ${company.isFollowed ? "bg-[#154C91]! border-[#154C91]!" : "border-gray-200!"} 
             ${company.isFollowed ? "text-white!" : "text-gray-900!"}`}>
            {company.isFollowed ? "Đang theo dõi" : "Theo dõi"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompanyItem;
