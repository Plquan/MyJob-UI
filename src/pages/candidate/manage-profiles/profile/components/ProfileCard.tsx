import {
    Button,
    Card,
    Switch,
    Tooltip
  } from "antd";
  import {
    EditOutlined,
    FileTextOutlined,
    UserOutlined,
    DollarOutlined,
    CalendarOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
  } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { useEffect } from "react";
import { resumeActions } from "../../../../../stores/resumeStore/resumeReducer"
import { POSITION_OPTIONS } from "../../../../../constant/selectOptions";
import { getLabelFromValue } from "../../../../../ultils/functions/getLabelFromValue";
import { formatVND } from "../../../../../ultils/functions/formatVND";
import dayjs from 'dayjs';

const NOT_UPDATE =  <span className="text-gray-400 text-xs italic">Chưa cập nhật</span>
const renderField = (value: any) => !!value ? value : NOT_UPDATE

const ProfileCard = ({ onEdit }: { onEdit: () => void }) => {
  const dispatch = useDispatch<AppDispatch>()
  const {resume} = useSelector((state: RootState) => state.resumeStore)
  const {currentUser} = useSelector((state: RootState) => state.authStore)

  useEffect(() => {
    dispatch(resumeActions.getOnlineResume())
  },[dispatch])


    return (
     <Card 
        title={"Hồ sơ của tôi"} 
        className="w-200!"
        extra={
          <div className="flex items-center gap-2">
            <Switch size="small" checked={resume?.isActive}/>
            <span className="text-xs text-gray-500">
              Cho phép tìm kiếm
            </span>
            <Tooltip title={"Bật \"Cho phép tìm kiếm\" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái \"cho phép tìm kiếm\" trong tất cả hồ sơ của bạn."}>
              <QuestionCircleOutlined className="text-gray-400 cursor-pointer"/>
            </Tooltip>
            <Button
              className="bg-orange-100 text-orange-700 border-none ml-2"
            >
              Tải xuống
            </Button>
          </div>
        }
     >
        <div className="flex items-center gap-4 mb-2">
          <div>
            <div className="font-bold text-lg">{currentUser?.fullName}</div>
            <div className="text-xs text-gray-500 italic">
              Chưa cập nhật
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1 mb-2">
          <div className="flex items-center gap-2">
            <FileTextOutlined />
            Kinh nghiệm: {renderField(resume?.experience)}
          </div>
          <div className="flex items-center gap-2">
            <UserOutlined />
            Cấp bậc: 
            {renderField(getLabelFromValue(POSITION_OPTIONS,resume?.position))}    
          </div>
          <div className="flex items-center gap-2">
            <DollarOutlined />
            Mức lương mong muốn:
            {renderField(formatVND(resume?.salaryMin))} - {renderField(formatVND(resume?.salaryMax))}         
          </div>
          <div className="flex items-center gap-2">
            <CalendarOutlined />
            Ngày cập nhật: {resume?.updatedAt ? dayjs(resume?.updatedAt).format('DD/MM/YYYY') : undefined}
          </div>
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
     </Card>
    )
}

export default ProfileCard;
