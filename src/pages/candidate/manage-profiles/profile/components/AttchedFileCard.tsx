import { Card, Empty } from "antd"

const AttchedFileCard = () => {
    return (
        <Card title={"Hồ sơ đính kèm (0)"}>
        <div className="flex flex-col items-center justify-center py-8">

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      </Card>
    )
}

export default AttchedFileCard