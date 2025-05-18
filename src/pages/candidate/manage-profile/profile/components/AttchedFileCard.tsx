import { Empty } from "antd"

const AttchedFileCard = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="font-semibold mb-2">Hồ sơ đính kèm (0)</div>
        <div className="flex flex-col items-center justify-center py-8">

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      </div>
    )
}

export default AttchedFileCard