import { Card, Empty, Form, Button, Tooltip } from "antd"
import AttachedResumeModal from "./components/AttachedResumeModal"
import { useEffect, useState } from "react"
import type { IUploadAttachedResume } from "../../../../../../types/resume/ResumeType"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../../stores"
import { resumeActions } from "../../../../../../stores/resumeStore/resumeReducer"
import { DeleteOutlined, EditOutlined, DownloadOutlined, FilePdfOutlined, FileWordOutlined } from "@ant-design/icons"
import downloadPdf from "../../../../../../ultils/functions/dowloadFile"



const AttchedResumeCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {attachedResumes, loading,isSubmitting } = useSelector((state: RootState) => state.resumeStore)
  const [form] = Form.useForm()

  useEffect (() => {
    dispatch(resumeActions.getAllAttachedResumes())
  },[dispatch])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleFinish = (values: IUploadAttachedResume) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "file") {
        const fileList = value as any[];
        if (Array.isArray(fileList) && fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("file", fileList[0].originFileObj);
        }
      } else {
        const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
        formData.append(key, stringValue);
      }
    })
      dispatch(resumeActions.uploadAttachedResume(formData))
      setIsModalOpen(false)
      form.resetFields()
  }

  const handleDelete = (attachedResumeId: number) => {
    dispatch(resumeActions.deleteAttachedResume(attachedResumeId))
  }

    return (
      <>
        <Card title={`Hồ sơ đính kèm (${attachedResumes.length})`} 
        extra={
          <span
          onClick={showModal}
            className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
            <span className="text-lg mr-1 leading-none"></span> + Thêm hồ sơ 
          </span>}
          loading={loading}
        >
        <div className="flex flex-col items-center justify-center py-8 w-120">
          {attachedResumes.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Hiện không có hồ sơ đính kèm."}/>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {attachedResumes.map((resume) => (
                <div key={resume.id} className="relative bg-white rounded-xl shadow-md overflow-hidden group">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#e0f2fe] text-[#1976d2] text-xs px-3 py-1 rounded-full shadow">
                      Cho phép tìm kiếm
                    </span>
                  </div>
                  <div className="h-48 w-full bg-gradient-to-b from-[#b6c7d6] to-[#6a8ca4] flex items-center justify-center relative">
                    <FilePdfOutlined style={{ fontSize: 64, color: '#fff', opacity: 0.7 }} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-white text-base font-semibold truncate">
                        {resume.position}
                      </div>
                      <Tooltip title="Chỉnh sửa">
                        <EditOutlined className="ml-2 cursor-pointer hover:text-yellow-400" />
                      </Tooltip>
                    </div>
                    <div className="text-white text-xs mt-1">
                      Cập nhật lần cuối: {resume.updatedAt ? new Date(resume.updatedAt).toLocaleString() : ""}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button loading={isSubmitting} type="primary" size="small" onClick={() => downloadPdf(resume.myJobFile.url)} icon={<DownloadOutlined />}>
                        Tải xuống
                      </Button>
                      <Tooltip title="Xóa">
                        <Button onClick={() => handleDelete(resume.id)} loading={isSubmitting} type="text" danger size="small" icon={<DeleteOutlined />} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <AttachedResumeModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
        form={form}
      />
   </>
    
    )
}

export default AttchedResumeCard