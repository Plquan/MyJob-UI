import { Avatar, Button, Empty, Spin } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../stores";
import { companyActions } from "../../stores/companyStore/companyReducer";
import CompanyImages from "./components/CompanyImages";
import JobCard from "../../components/JobCard";

export default function CompanyDetail() {
  const dispatch = useDispatch();
  const { companyId } = useParams<{ companyId: string }>();
  const { companyDetail, loading } = useSelector((state: RootState) => state.companyStore);
  

  React.useEffect(() => {
    if (companyId) {
      dispatch(companyActions.getCompanyDetail(parseInt(companyId)) as any);
    }
  }, [dispatch, companyId]);

  const company = companyDetail?.company;
  const companyImages = companyDetail?.images
    ?.filter(img => img.fileType === "COMPANY_IMAGE")
    ?.map(img => img.url) || [];
  const jobPosts = companyDetail?.jobPosts || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Empty description="Không tìm thấy thông tin công ty" />
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        <div className="relative">
          <img
            src={companyDetail?.images?.find(img => img.fileType === "COVER_IMAGE")?.url || "/assets/hiring-banner.png"}
            alt="cover"
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="flex justify-between -mt-10  items-center px-6 py-4 mb-7 ">
          <div className="flex items-center  gap-4">
            <Avatar
              size={90}
              shape="square"
              src={companyDetail?.images?.find(img => img.fileType === "LOGO")?.url || "/assets/vinhuni.png"}
              className="border-5! border-white bg-white! shadow-xl"
            />
            <div className="mt-10">
              <div className="font-bold text-lg">{company.companyName}</div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <span className="flex items-center">
                  <UserOutlined className="mr-1" />
                  {company.fieldOperation || "Chưa cập nhật"}
                </span>
                <span className="flex items-center">
                  <TeamOutlined className="mr-1" />
                  {company.employeeSize ? `${company.employeeSize} nhân viên` : "Chưa cập nhật"}
                </span>
                <span className="flex items-center">
                  <CalendarOutlined className="mr-1" />
                  {company.since ? new Date(company.since).toLocaleDateString('vi-VN') : "Chưa cập nhật"}
                </span>
                <Button
                  icon={<ShareAltOutlined />}
                  className="bg-orange-400 border-none text-white"
                >
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 flex gap-6">
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="font-bold text-lg mb-2 text-[#2d2172]">Về công ty</div>
          {company.description ? (
            <div className="text-sm text-gray-700">
              {company.description}
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có mô tả về công ty" />
          )}
          <div className="mt-6">
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Việc làm đang tuyển</div>
            <div className="py-4">
              {jobPosts.length > 0 ? (
                <div className="space-y-4">
                  {jobPosts.map((job) => (
                  <h1></h1>
                  ))}
                </div>
              ) : (
                <Empty description="Chưa có việc làm nào" />
              )}
            </div>
          </div>
        </div>
        {/* Card Website & Thông tin liên hệ */}
        <div className="w-80 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Website</div>
            <div className="text-sm break-words">
              {company.websiteUrl ? (
                <a 
                  href={company.websiteUrl.startsWith('http') ? company.websiteUrl : `https://${company.websiteUrl}`} 
                  className="text-blue-600 hover:underline block" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {company.websiteUrl}
                </a>
              ) : (
                <span className="text-gray-500">Chưa cập nhật</span>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Theo dõi tại</div>
            <div className="flex gap-3">
              {company.facebookUrl && (
                <a href={company.facebookUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-square fa-lg"></i>
                </a>
              )}
              {company.linkedInUrl && (
                <a href={company.linkedInUrl} className="text-blue-400" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
              )}
              {company.youtubeUrl && (
                <a href={company.youtubeUrl} className="text-red-500" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
              )}
              {!company.facebookUrl && !company.linkedInUrl && !company.youtubeUrl && (
                <span className="text-gray-500 text-sm">Chưa cập nhật</span>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Thông tin chung</div>
            <div className="text-sm text-gray-700">
              <div><b>📧</b> {company.companyEmail || "Chưa cập nhật"}</div>
              <div><b>📞</b> {company.companyPhone || "Chưa cập nhật"}</div>
              <div><b>📍</b> {company.address || "Chưa cập nhật"}</div>
            </div>
          </div>

          {/* Phần hình ảnh */}
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Hình ảnh</div>
            <CompanyImages images={companyImages} />
          </div>
        </div>
      </div>

    </div>
  );
}