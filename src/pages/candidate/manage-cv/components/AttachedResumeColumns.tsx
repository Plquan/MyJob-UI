// AttachedResumeColumns.tsx
import { Button, Tooltip, Tag } from "antd"
import { DeleteOutlined, EditOutlined, DownloadOutlined, EyeOutlined, RightOutlined } from "@ant-design/icons"
import type { IResume } from "../../../../types/resume/ResumeType"
import downloadFile from "../../../../ultils/functions/dowloadFile"
import ROUTE_PATH from "../../../../routes/routePath"
import type { ColumnsType } from "antd/es/table"
import { EResumeType } from "../../../../enums/resume/EResumeType"

interface ColumnsProps {
  isSubmitting: boolean
  handleDelete: (id: number) => void
  handleEdit: (data: IResume) => void
  selectedRow: number | null
  setSelectedRow: (index: number) => void
  handleSetSelectedResume: (id: number) => void
}

// const openPdfInNewTab = async (resumeData: any) => {
//   const blob = await pdf(<CVPdfDocument resume={resumeData} />).toBlob();
//   const url = URL.createObjectURL(blob);
//   window.open(url, "_blank");
// };

const AttachedResumeColumns = ({
  isSubmitting,
  handleDelete,
  handleEdit,
  handleSetSelectedResume,
}: ColumnsProps) => {
  const columns: ColumnsType<IResume> = [
    {
      title: 'Tùy chỉnh',
      key: 'selected',
      align: 'center' as const,
      render: (_: any, record: IResume) => (
        <input
          type="radio"
          name="resume-radio-group"
          checked={!!record.selected}
          onChange={() => handleSetSelectedResume(record.id)}
        />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record) => {
        if (record.type === EResumeType.ONLINE) {
          return <span className="font-medium">MyJob CV</span>;
        }
        return <span className="font-medium">{text || record.title || 'Chưa có tiêu đề'}</span>;
      },
    },
    {
      title: 'Loại hồ sơ',
      dataIndex: 'type',
      key: 'type',
      align: 'center' as const,
      render: (type: EResumeType) => {
        if (type === EResumeType.ONLINE) {
          return <Tag color="blue">Trực tuyến</Tag>;
        }
        return <Tag color="green">Đính kèm</Tag>;
      },
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
      render: (_: any, record) => {
        if (record.type === EResumeType.ONLINE) {
          return (
                <Tooltip title="Đi tới hồ sơ trực tuyến">
                <Button
                  size="small"
                  href={ROUTE_PATH.CANDIDATE_ONLINE_RESUME}         
                  icon={<RightOutlined  style={{ color: '#1976d2' }} />}
                  />
              </Tooltip>
          )
        }
        return (
          <div className="flex gap-2 justify-center">
            <Tooltip title="Xem">
              <Button
                loading={isSubmitting}
                size="small"
                icon={<EyeOutlined style={{ color: '#1976d2' }} />}
                onClick={async () => {
                    window.open(record.myJobFile?.url, '_blank')     
                }}
              />
            </Tooltip>
              <>
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
                    onClick={() => downloadFile(record.myJobFile?.url,record.title)}
                    disabled={!record.myJobFile?.url}
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
              </>
          </div>
        );
      }
    }
  ]

  return columns
}

export default AttachedResumeColumns
