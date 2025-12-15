import { Card, Empty, Form, Table } from "antd"
import AttachedResumeModal from "./components/AttachedResumeModal"
import { useEffect, useState } from "react"
import { useDispatch, useSelector as useReduxSelector } from "react-redux"
import AttachedResumeColumns from "./components/AttachedResumeColumns"
import type { AppDispatch, RootState } from "../../../stores"
import type { IResume, IUpdateAttachedResume } from "../../../types/resume/ResumeType"
import { attachedResumeActions } from "../../../stores/attachedResumeStore/attachedResumeReducer"

const AttchedResumeCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {attachedResumes, loading,isSubmitting } = useReduxSelector((state: RootState) => state.attachedResumeStore)
  const [selectedResume, setSelectedResume] = useState<IResume | null>(null)
  const [form] = Form.useForm()
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect (() => {
    dispatch(attachedResumeActions.getResumes())
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

    const { file, ...restValues } = values;
    const resumeData = {
      ...restValues,
      salaryMin: +values.salaryMin,
      salaryMax: +values.salaryMax,
    }

    formData.append("data", JSON.stringify(resumeData));
    if (values.id) {
      dispatch(attachedResumeActions.updateAttachedResume(formData));
    } else {
      dispatch(attachedResumeActions.uploadAttachedResume(formData));
    }
    setIsModalOpen(false)
  }

  const handleDelete = (attachedResumeId: number) => {
    dispatch(attachedResumeActions.deleteAttachedResume(attachedResumeId))
  }

  const handleEdit = (data: IResume) => {
     setSelectedResume(data)
     setIsModalOpen(true)
  }

  const handleSetSelectedResume = (id: number) => {
    dispatch(attachedResumeActions.setSelectedResume(id));
  };

    return (
      <>
        <Card title={"Danh sách CV của bạn"} 
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
              loading={isSubmitting}
              columns={AttachedResumeColumns({ isSubmitting, handleDelete, handleEdit, selectedRow, setSelectedRow, handleSetSelectedResume })}
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