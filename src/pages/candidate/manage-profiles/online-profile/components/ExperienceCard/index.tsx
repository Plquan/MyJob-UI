import { Card, Form } from "antd";
import { EditOutlined, DeleteOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useState } from 'react';
import ExperienceModal from "./components/ExperienceModal";
import type { ICertificateData } from "../../../../../../types/resume/ResumeType";

const ExperienceCard = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<ICertificateData>()
  
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleSubmit = (value: ICertificateData) => {
    console.log(value)
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  }

  return (
    <Card title={"Kinh nghiệm làm việc"} extra={
      <a onClick={showModal} className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
        <span className="text-lg mr-1 leading-none"></span> + Thêm kinh nghiệm làm việc
      </a>}>
      <div className="mb-2">
        <div className="flex items-start gap-2 mb-1">
          <span className="mt-1 w-2 h-2 rounded-full bg-orange-300 inline-block"></span>
          <span className="text-medium ">10/20/102- 20/10</span>
        </div>
        <div className="ml-1 border-l-2 border-gray-300 pl-4">
          <div className="font-semibold mb-1">Lapaj trih vien pythons</div>
          <div className="text-medium  mb-2">Trung tâm Đào tạo ABC</div>
          <div className="flex gap-2">
            <EditOutlined className="text-yellow-500! cursor-pointer mr-3" />
            <DeleteOutlined className="text-red-500! cursor-pointer" />
          </div>
          <hr className="my-2 mb-2 text-gray-300 mt-4" />
          <div className="flex items-center  justify-between mb-1">
            <div className="font-sm text-gray-500">Mô tả chi tiết</div>
            <span className="cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
              <CaretDownOutlined className={`${showDescription ? 'rotate-180' : ''} transition-all duration-300`} />
            </span>
          </div>
          {showDescription && (
            <div className="text-medium">Mô tả quá trình làm việc tại đây.</div>
          )}
        </div>
      </div>
      <ExperienceModal 
        form={form}
        open={isModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Card>
  );
};

export default ExperienceCard;
