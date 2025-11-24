import { Card, Avatar, Button } from "antd";
import { CarryOutOutlined, EnvironmentOutlined, FlagOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { ICompanyWithImagesData } from "../../types/company/CompanyType";
import { FileType } from "../../constant/fileType";
import ROUTE_PATH from "../../routes/routePath";
import { companyActions } from "../../stores/companyStore/companyReducer";
import type { RootState, AppDispatch } from "../../stores";
import { BookmarkIcon } from "../../assets/icon/bookmark";

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

  const handleToggleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await dispatch(companyActions.toggleFollowCompany(company.company.id)).unwrap();
  };

  return (
    <Card
      key={company.company.id}
      hoverable
      onClick={() => navigate(ROUTE_PATH.COMPANY_DETAIL.replace(':companyId', company.company.id.toString()))}
    >
      <div className="relative">
        <img
          alt="cover"
          src={getCompanyCover(company)}
          className="w-full h-28 object-cover rounded-t-lg"
        />

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

      <div className="flex justify-end items-center text-xs text-gray-600 mt-2">
        <UsergroupAddOutlined style={{ fontSize: 14 }} />
        <span className="ml-1">0 lượt theo dõi</span>
      </div>

      <div className="pt-3">
        <h3 className="text-xl font-semibold mb-1">{company.company.companyName}</h3>
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

        <div className="mt-4">
          <Button
            className="w-full"
            onClick={handleToggleFollow}
            loading={submitting.followCompany}
            icon={company.isFollowed ?  <BookmarkIcon className="w-4 h-4" stroke="white" fill="white" /> : <BookmarkIcon className="w-4 h-4" />
            
            }
            type={company.isFollowed ? "primary" : "default"}
          >
            {company.isFollowed ? "Đang theo dõi" : "Theo dõi"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompanyItem;
