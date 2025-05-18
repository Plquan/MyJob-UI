import {
    Button,
    Switch,
  } from "antd";
  import {
    EditOutlined,
    FileTextOutlined,
    UserOutlined,
    DollarOutlined,
    CalendarOutlined,
    ExclamationCircleOutlined,
  } from "@ant-design/icons";

 const ProfileCard = ({ onEdit }: { onEdit: () => void }) => {
    return (
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <div>
            <div className="font-bold text-lg">PHẠM LÊ QUÂN</div>
            <div className="text-xs text-gray-500 italic">
              Chưa cập nhật
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1 mb-2">
          <div className="flex items-center gap-2">
            <FileTextOutlined />
            Kinh nghiệm:{" "}
            <span className="text-gray-500 italic">
              Chưa cập nhật
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserOutlined />
            Cấp bậc:{" "}
            <span className="text-gray-500 italic">Chưa cập nhật</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarOutlined />
            Mức lương mong muốn:{" "}
            <span className="text-gray-500 italic">...</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarOutlined />
            Ngày cập nhật:{" "}
            <span className="text-gray-500">21/04/2024 00:49:49</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Switch size="small" defaultChecked />
          <span className="text-xs text-gray-500">
            Cho phép tìm kiếm
          </span>
          <Button
            size="small"
            className="bg-orange-100 text-orange-700 border-none ml-2"
          >
            Tải xuống
          </Button>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-2">
          <ExclamationCircleOutlined className="mr-1 text-lg text-gray-400" />
          <span>
            Vui lòng thêm tất cả các thông tin cần thiết để hoàn thành
            hồ sơ của bạn.
          </span>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          className="mt-2"
          onClick={() => onEdit()}
        >
          Chỉnh Sửa Hồ Sơ
        </Button>
      </div>

    )
}

export default ProfileCard;
