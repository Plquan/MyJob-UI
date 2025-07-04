import { Tooltip, Switch } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { authActions } from "../../../../../stores/authStore/authReducer";

 const AllowSearchToggle = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentUser, isSubmitting } = useSelector((state: RootState) => state.authStore)
  
   const toggleAllowSearch = (checked: boolean) => {
     dispatch(authActions.allowSearch(checked))
   }
    
  return (
    <div className="flex items-center gap-2  p-2 ">
      <span className="text-xs text-gray-500">Cho phép tìm kiếm</span>
      <Tooltip title={'Bật "Cho phép tìm kiếm" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn.'}>
        <QuestionCircleOutlined className="text-gray-400 cursor-pointer" />
      </Tooltip>
      <Switch size="small" checked={currentUser?.allowSearch} onChange={toggleAllowSearch} loading = {isSubmitting}/>
    </div>
  )
} 


export default AllowSearchToggle
