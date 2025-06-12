import { Card, Empty } from "antd"

const ViewedCard = () => {
return  (
   <Card title={"Ai đã xem hồ sơ của bạn"}>
    <div className="w-full md:w-80 p-6 flex flex-col items-center justify-center">
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description ={"Chưa có nhà tuyển dụng nào xem hồ sơ của bạn"}/>
    <a
      href="#"
      className="text-blue-500 text-xs hover:underline"
    >
      Xem chi tiết
    </a>
  </div>

   </Card>

)
}

export default ViewedCard