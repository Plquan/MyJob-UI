import { Avatar, Button, Tooltip, Carousel, Modal, Empty } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import React from "react";
import CompanyImages from "./components/CompanyImages";

export default function CompanyDetail() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState("/assets/hiring-banner.png");

  const showModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const companyImages = [
    "/assets/hiring-banner.png",
    "/assets/hiring-banner.png",
    "/assets/hiring-banner.png",
    "/assets/hiring-banner.png",
  ];

  return (
    <div className="mb-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        {/* Cover Image */}
        <div className="relative">
          <img
            src="/assets/hiring-banner.png"
            alt="cover"
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="flex justify-between -mt-10  items-center px-6 py-4 mb-7 ">
          <div className="flex items-center  gap-4">
            <Avatar
              size={90}
              shape="square"
              src="/assets/vinhuni.png"
              className="border-4 border-white bg-white! shadow-xl"
            />
            <div className="mt-10">
              <div className="font-bold text-lg">GSI GROUP LIMITED</div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <span className="flex items-center">
                  <UserOutlined className="mr-1" />
                  Gia công phần mềm
                </span>
                <span className="flex items-center">
                  <TeamOutlined className="mr-1" />
                  500-1000 nhân viên
                </span>
                <span className="flex items-center">
                  <CalendarOutlined className="mr-1" />
                  Invalid Date
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

      {/* 2 Card phía dưới header */}
      <div className="max-w-5xl mx-auto mt-6 flex gap-6">
        {/* Card Về công ty */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="font-bold text-lg mb-2 text-[#2d2172]">Về công ty</div>
          <div className="text-sm text-gray-700">
            <b>GSI</b> is providing software consulting, sales and development services in the field of <b>BIM Development (BIM - Building Information Modelling)</b>. Since <b>2019</b> GSI has worked in close collaboration with construction engineering and the software company Allplan in Germany to bring innovation to the construction industry through automated processes in the design. Together with its partners GSI plans to leverage the great experience and expertise in the coming years to become a reputable player in the field of design automations in the construction industry, improving quality and reducing cost in the design / construction of buildings.
          </div>
          {/* Phần Việc làm đang tuyển */}
          <div className="mt-6">
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Việc làm đang tuyển</div>
            <div className="flex flex-col items-center justify-center py-4">
              <Empty />
            </div>
          </div>
        </div>
        {/* Card Website & Thông tin liên hệ */}
        <div className="w-80 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Website</div>
            <div className="text-sm break-words">
              <a href="https://www.topcv.vn/cong-ty/gsi-group-limited" className="text-blue-600 hover:underline block" target="_blank" rel="noopener noreferrer">https://www.topcv.vn/cong-ty/gsi-group-limited</a>
              <a href="https://www.gsi-group.asia" className="text-blue-600 hover:underline block" target="_blank" rel="noopener noreferrer">www.gsi-group.asia</a>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Theo dõi tại</div>
            <div className="flex gap-3">
              <a href="#" className="text-blue-500"><i className="fab fa-facebook-square fa-lg"></i></a>
              <a href="#" className="text-blue-400"><i className="fab fa-linkedin fa-lg"></i></a>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Thông tin chung</div>
            <div className="text-sm text-gray-700">
              <div><b>📧</b> 1951050027huy@ou.edu.vn</div>
              <div><b>📞</b> 0888999111</div>
            </div>
          </div>

          {/* Phần hình ảnh */}
          <div>
            <div className="font-bold text-lg mb-2 text-[#2d2172]">Hình ảnh</div>
            <CompanyImages images={companyImages} />
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <img
          src={currentImage}
          alt="Enlarged view"
          className="w-full object-contain"
        />
      </Modal>
    </div>
  );
}