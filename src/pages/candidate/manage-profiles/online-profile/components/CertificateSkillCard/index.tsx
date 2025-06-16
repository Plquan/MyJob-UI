import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import CertificateModal from "./components/CertificateModal";

const CertificateSkillCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleFinish = (values: any) => {
    // Xử lý lưu chứng chỉ ở đây
    setIsModalOpen(false);
  };

  return (
    <>
      <Card title={"Chứng chỉ"}
        extra={
          <a
            className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center"
            onClick={showModal}
          >
            <span className="text-lg mr-1 leading-none"></span> + Thêm chứng chỉ
          </a>
        }
      >
              
      <div className="mb-2">
      <div className="flex items-start gap-2 mb-1">
            <span className="mt-1 w-2 h-2 rounded-full bg-orange-300 inline-block"></span>
            <span className="text-medium ">Không thời hạn</span>
          </div>
          <div className="ml-1 border-l-2 border-gray-300 pl-4">
            <div className="font-semibold mb-1">Chứng Chỉ A</div>
            <div className="text-medium  mb-2">Trung tâm Đào tạo ABC</div>
            <div className="flex gap-2">
              <EditOutlined className="text-yellow-500! cursor-pointer mr-3" />
              <DeleteOutlined className="text-red-500! cursor-pointer" />
            </div>
          </div>
      </div>

     
      </Card>
      <CertificateModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
      />
    </>
  )
};
export default CertificateSkillCard
