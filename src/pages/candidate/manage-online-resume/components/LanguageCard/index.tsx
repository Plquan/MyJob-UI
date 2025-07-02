import { Card, Table, Tooltip, Button, Empty, Form } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import LanguageModal from './components/LanguageModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_OPTIONS } from "../../../../../constant/selectOptions";
import type { AppDispatch, RootState } from "../../../../../stores";
import  { languageActions } from "../../../../../stores/languageStore/languageReducer";
import type { ILanguage } from "../../../../../types/resume/LanguageType";
import { getLabelFromValue } from "../../../../../ultils/functions/getLabelFromValue";



const columns = (
  onEdit: (record: ILanguage) => void,
  onDelete: (id: number) => void,
  isSubmitting:boolean
) => [
  {
    title: "Ngoại ngữ",
    dataIndex: "language",
    key: "language",
    align: "left" as const,
    render: (value: string) => getLabelFromValue(LANGUAGE_OPTIONS, value),
  },
  {
    title: "Trình độ",
    dataIndex: "level",
    key: "level",
    align: "center" as const,
    render: (level: number) => (
      <span>
        {[...Array(5)].map((_, i) => (
          <StarFilled
            key={i}
            style={{ color: i < level ? '#faad14' : '#d9d9d9', fontSize: 20 }}
          />
        ))}
      </span>
    ),
  },
  {
    title: "Hành động",
    key: "action",
    align: "center" as const,
    render: (_: any, record: ILanguage) => (
      <span>
        <Tooltip title="Sửa">
        <Button
          icon={<EditOutlined />}
          type="text"
          size="small"
          loading={isSubmitting}
          onClick={() => onEdit(record)}
          className="text-yellow-500! border-yellow-500 hover:!text-yellow-600 hover:!border-yellow-600"
        />
        </Tooltip>
        <Tooltip title="Xóa">
        <Button
          icon={<DeleteOutlined />}
          type="text"
          size="small"
          danger
          loading={isSubmitting}
          onClick={() => onDelete(record.id)}
        />
        </Tooltip>
      </span>
    ),
  },
]

const LanguageCard = () => {
  const [form] = Form.useForm<ILanguage>()
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(null)
  const { languages, isSubmitting, loading } = useSelector((state: RootState) => state.onlineResumeStore)
  
  const showModal = () => {
    setSelectedLanguage(null)
    setIsModalOpen(true);
  }

  const handleSubmit = (data: ILanguage) => {
    const isEditing = Boolean(data.id);

    const action = isEditing
      ? languageActions.updateLanguage(data)
      : languageActions.createLanguage(data);
  
    dispatch(action)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  }
 
  const handleEdit = (data: ILanguage) => {
    setSelectedLanguage(data)
    setIsModalOpen(true)
  }

  const handleDelete = (experienceId: number) => {
    dispatch(languageActions.deleteLanguage(experienceId))
  }

  return (
    <>
      <Card title={"Ngôn ngữ"}
        extra={
          <span
            className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center"
            onClick={showModal}
          >
            <span className="text-lg mr-1 leading-none"></span> + Thêm Ngôn ngữ
          </span>
        }
        loading={loading.languages}
      >
        {languages.length > 0 ? (
          <Table
            columns={columns(handleEdit, handleDelete,isSubmitting.languages)}
            dataSource={languages}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có kỹ năng ngôn ngữ nào." />
        )}
      </Card>
      <LanguageModal
         form={form}
         open={isModalOpen}
         onSubmit={handleSubmit}
         onCancel={handleCancel}
         initialValues={selectedLanguage}
      />
    </>
  )
}

export default LanguageCard;
