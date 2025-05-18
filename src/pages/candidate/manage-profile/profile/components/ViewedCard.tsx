import { Empty } from "antd"

const ViewedCard = () => {
return  (
    <div className="w-full md:w-80 bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
    <div className="w-32 h-32 mb-2">
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
    <div className="font-semibold text-gray-700 mb-1">
      Ai đã xem hồ sơ của bạn
    </div>
    <div className="text-xs text-gray-500 mb-2 text-center">
      Chưa có nhà tuyển dụng nào xem hồ sơ bạn
    </div>
    <a
      href="#"
      className="text-blue-500 text-xs hover:underline"
    >
      Xem chi tiết
    </a>
  </div>
)
}

export default ViewedCard