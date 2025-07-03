// import {
//     Button,
//     Card,
//     Switch,
//     Tooltip
//   } from "antd";
//   import {
//     EditOutlined,
//     FileTextOutlined,
//     UserOutlined,
//     DollarOutlined,
//     CalendarOutlined,
//     ExclamationCircleOutlined,
//     QuestionCircleOutlined,
//   } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import dayjs from 'dayjs';
// import { POSITION_OPTIONS } from "../../../../../../constant/selectOptions";
// import type { AppDispatch, RootState } from "../../../../../../stores";
// import  { formatVND } from "../../../../../../ultils/functions/formatVND";
// import { getLabelFromValue } from "../../../../../../ultils/functions/getLabelFromValue";
// import { resumeActions } from "../../../../../../stores/resumeStore/resumeReducer";
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import CVPdfDocument from "../CVPdfDocument";

// const NOT_UPDATE =  <span className="text-gray-400 text-xs italic">Chưa cập nhật</span>
// const renderField = (value: any) => !!value ? value : NOT_UPDATE

// const ProfileCard = ({ onEdit }: { onEdit: () => void }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const {onlineResume} = useSelector((state: RootState) => state.resumeStore)
//   const {currentUser} = useSelector((state: RootState) => state.authStore)
//   const candidate = useSelector((state: RootState) => state.candidateStore.candidate)
//   const skills = useSelector((state: RootState) => state.skillStore.skills);
//   const languages = useSelector((state: RootState) => state.languageStore.languages);
//   const experiences = useSelector((state: RootState) => state.experienceStore.experiences);
//   const educations = useSelector((state: RootState) => state.educationStore.educations);
//   const certificates = useSelector((state: RootState) => state.certificateStore.certificates);

//   useEffect(() => {
//     dispatch(resumeActions.getOnlineResume())
//   },[dispatch])

//   return (
//      <Card 
//         title={"Hồ sơ của tôi"} 
//         className="w-200!"
//         extra={
//           <div className="flex items-center gap-2">
//             <Switch size="small" checked={onlineResume?.isActive}/>
//             <span className="text-xs text-gray-500">
//               Cho phép tìm kiếm
//             </span>
//             <Tooltip title={"Bật \"Cho phép tìm kiếm\" sẽ giúp nhà tuyển dụng tìm thấy hồ sơ của bạn và họ có thể liên hệ với bạn về công việc mới. Chỉ có duy nhất một hồ được bật trạng thái \"cho phép tìm kiếm\" trong tất cả hồ sơ của bạn."}>
//               <QuestionCircleOutlined className="text-gray-400 cursor-pointer"/>
//             </Tooltip>
//             <PDFDownloadLink
//               document={
//                 <CVPdfDocument
//                   resume={onlineResume}
//                   user={currentUser}
//                   skills={skills}
//                   languages={languages}
//                   experiences={experiences}
//                   educations={educations}
//                   certificates={certificates}
//                 />
//               }
//               fileName="CV_MyJob.pdf"
//             >
//               {({ loading }) =>
//                 loading ? 'Đang tạo file...' : (
//                   <Button className="bg-orange-100 text-orange-700 border-none ml-2">
//                     Tải xuống
//                   </Button>
//                 )
//               }
//             </PDFDownloadLink>
//           </div>
//         }
//      >
//         <div className="flex items-center gap-4 mb-2">
//           <div>
//             <div className="font-bold text-lg">{currentUser?.fullName}</div>
//             <div className="text-xs text-gray-500 italic">
//               Chưa cập nhật
//             </div>
//           </div>
//         </div>

//         <div className="text-sm text-gray-700 space-y-1 mb-2">
//           <div className="flex items-center gap-2">
//             <FileTextOutlined />
//             Kinh nghiệm: {renderField(onlineResume?.experience)}
//           </div>
//           <div className="flex items-center gap-2">
//             <UserOutlined />
//             Cấp bậc: 
//             {renderField(getLabelFromValue(POSITION_OPTIONS,onlineResume?.position))}    
//           </div>
//           <div className="flex items-center gap-2">
//             <DollarOutlined />
//             Mức lương mong muốn:
//             {renderField(formatVND(onlineResume?.salaryMin))} - {renderField(formatVND(onlineResume?.salaryMax))}         
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarOutlined />
//             Ngày cập nhật: {onlineResume?.updatedAt ? dayjs(onlineResume?.updatedAt).format('DD/MM/YYYY') : undefined}
//           </div>
//         </div>

//         <div className="flex items-center text-xs text-gray-500 mb-2">
//           <ExclamationCircleOutlined className="mr-1 text-lg text-gray-400" />
//           <span>
//             Vui lòng thêm tất cả các thông tin cần thiết để hoàn thành
//             hồ sơ của bạn.
//           </span>
//         </div>

//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           className="mt-2"
//           onClick={() => onEdit()}
//         >
//           Chỉnh Sửa Hồ Sơ
//         </Button>
//      </Card>
//     )
// }

// export default ProfileCard;
