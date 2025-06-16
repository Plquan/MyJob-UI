import { Card } from "antd";

const EducationCard = () => {
  return (
    <Card title={"Thông tin học vấn"} 
    extra = {
      <a className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
      <span className="text-lg mr-1 leading-none"></span> + Thêm thông tin học vấn
    </a>
    }
    >
    <div className="flex justify-center items-center p-12 text-gray-400 flex-col">
      <div className="w-24 mb-4">
      </div>
    </div>
  </Card>
  );
};

export default EducationCard;