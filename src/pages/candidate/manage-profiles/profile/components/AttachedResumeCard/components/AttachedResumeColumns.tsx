// AttachedResumeColumns.tsx
import { Button, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons"
import type { IResume } from "../../../../../../../types/resume/ResumeType";
import downloadFile from "../../../../../../../ultils/functions/dowloadFile";

interface ColumnsProps {
  isSubmitting: boolean
  handleDelete: (id: number) => void
  handleEdit: (data: IResume) => void
}

 const AttachedResumeColumns = ({
  isSubmitting,
  handleDelete,
  handleEdit,
}: ColumnsProps) => [
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
            loading={isSubmitting}
            size="small"
            icon={<EyeOutlined style={{ color: '#1976d2' }} />}
            onClick={() => window.open(record.myJobFile.url, '_blank')}
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            size="small"
            loading={isSubmitting}
            icon={<EditOutlined style={{ color: '#ffa000' }} />}
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Tải xuống">
          <Button
            loading={isSubmitting}
            size="small"
            icon={<DownloadOutlined style={{ color: '#43a047' }} />}
            onClick={() => downloadFile(record.myJobFile.url,record.title)}
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

export default AttachedResumeColumns
