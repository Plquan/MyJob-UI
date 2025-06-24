import { Card, Empty, Form, Table } from "antd"
import AttachedResumeModal from "./components/AttachedResumeModal"
import { useEffect, useState } from "react"
import type { IResume, IUpdateAttachedResume } from "../../../../../../types/resume/ResumeType"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../../stores"
import { resumeActions } from "../../../../../../stores/resumeStore/resumeReducer"
import AttachedResumeColumns from "./components/AttachedResumeColumns"


const AttchedResumeCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {attachedResumes, loading,isSubmitting } = useSelector((state: RootState) => state.resumeStore)
  const [selectedResume, setSelectedResume] = useState<IResume | null>(null)
  const [form] = Form.useForm()

  useEffect (() => {
    dispatch(resumeActions.getAllAttachedResumes())
  },[dispatch])
  const showModal = () => {
    setSelectedResume(null)
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleFinish = (values: IUpdateAttachedResume) => {
    const formData = new FormData();
    const fileList = values.file as unknown as any[] | undefined
    const hasFile = Array.isArray(fileList) && fileList.length > 0 && fileList[0].originFileObj
    if (hasFile) {
      formData.append("file", fileList[0].originFileObj);
    }

    const resumeData = {
      ...values,
      salaryMin: +values.salaryMin,
      salaryMax: +values.salaryMax,
    }

    formData.append("data", JSON.stringify(resumeData));
    if (values.id) {
      dispatch(resumeActions.updateAttachedResume(formData));
    } else {
      dispatch(resumeActions.uploadAttachedResume(formData));
    }
    setIsModalOpen(false)
  }

  const handleDelete = (attachedResumeId: number) => {
    dispatch(resumeActions.deleteAttachedResume(attachedResumeId))
  }

  const handleEdit = (data: IResume) => {
     setSelectedResume(data)
     setIsModalOpen(true)
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

          {attachedResumes.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Hiện không có hồ sơ đính kèm."}/>
          ) : (
            <Table
              className="w-full"
              dataSource={attachedResumes}
              rowKey="id"
              pagination={false}
              bordered
              columns={AttachedResumeColumns({ isSubmitting, handleDelete, handleEdit})}
            />
          )}
      </Card>

      <AttachedResumeModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
        initialValues={selectedResume}
        form={form}
      />

    </>
    
    )
}

export default AttchedResumeCard