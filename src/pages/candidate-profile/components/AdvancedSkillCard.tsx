const AdvancedSkillCard = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md mb-6">
    <div className="flex justify-between items-center px-6 h-12 border-b border-gray-200">
    <span className="text-sm font-medium font-roboto">Kĩ năng chuyên môn</span>
      <a className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
        <span className="text-lg mr-1 leading-none"></span> + Thêm kĩ năng chuyên môn
      </a>
    </div>
    <div className="flex justify-center items-center p-12 text-gray-400 flex-col">
      <div className="w-24 mb-4">
      </div>
    </div>
  </div>
  );
};

export default AdvancedSkillCard;
