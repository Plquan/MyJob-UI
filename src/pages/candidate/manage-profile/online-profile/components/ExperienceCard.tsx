const ExperienceCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-md mb-6">
    <div className="flex justify-between items-center px-6 h-12 border-b border-gray-200">
    <span className="text-sm font-medium font-roboto">Kinh Nghiệm Làm Việc</span>
      <a className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
        <span className="text-lg mr-1 leading-none"></span> + Thêm kinh nghiệm làm việc
      </a>
    </div>
    <div className="flex justify-center items-center p-12 text-gray-400 flex-col">
      <div className="w-24 h-24 mb-4">
      </div>
    </div>
  </div>
  );
};

export default ExperienceCard;
