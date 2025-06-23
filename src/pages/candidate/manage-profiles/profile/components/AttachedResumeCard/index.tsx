import { Card, Empty, Form, Button, Tooltip, Table } from "antd"
import AttachedResumeModal from "./components/AttachedResumeModal"
import { useEffect, useState } from "react"
import type { IUploadAttachedResume } from "../../../../../../types/resume/ResumeType"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../../stores"
import { resumeActions } from "../../../../../../stores/resumeStore/resumeReducer"
import { DeleteOutlined, EditOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons"
import downloadPdf from "../../../../../../ultils/functions/dowloadFile"

interface GetColumnsProps {
  isSubmitting: boolean;
  downloadPdf: (url: string) => void;
  showModal: () => void;
  handleDelete: (id: number) => void;
}

const getColumns = ({ isSubmitting, downloadPdf, showModal, handleDelete }: GetColumnsProps) => [
  {
    title: 'STT',
    key: 'stt',
    align: 'center' as const,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Cập nhật lần cuối',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: string) => date ? new Date(date).toLocaleString() : '',
  },
  {
    title: 'Chức năng',
    key: 'actions',
    align: 'center' as const,
    render: (_: any, record: any) => (
      <div className="flex gap-2 justify-center">
        <Tooltip title="Xem">
          <Button
            size="small"
            icon={<EyeOutlined style={{ color: '#1976d2' }} />}
            onClick={() => window.open(record.myJobFile.url, '_blank')}
          />
        </Tooltip>
        <Tooltip title="Tải xuống">
          <Button
            loading={isSubmitting}
            size="small"
            icon={<DownloadOutlined style={{ color: '#43a047' }} />}
            onClick={() => downloadPdf(record.myJobFile.url)}
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            size="small"
            icon={<EditOutlined style={{ color: '#ffa000' }} />}
            onClick={showModal}
          />
        </Tooltip>
        <Tooltip title="Xóa">
          <Button
            loading={isSubmitting}
            size="small"
            danger
            icon={<DeleteOutlined style={{ color: '#e53935' }} />}
            onClick={() => handleDelete(record.id)}
          />
        </Tooltip>
      </div>
    )
  }
]

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
        const fileList = value as any[]
        if (Array.isArray(fileList) && fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("file", fileList[0].originFileObj)
        }
      } else {
        const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
        formData.append(key, stringValue)
      }
    })
      dispatch(resumeActions.uploadAttachedResume(formData))

  }

  const handleDelete = (attachedResumeId: number) => {
    dispatch(resumeActions.deleteAttachedResume(attachedResumeId))
  }

  const handleEdit = () => {

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
              columns={getColumns({ isSubmitting, downloadPdf, showModal, handleDelete })}
            />
          )}
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