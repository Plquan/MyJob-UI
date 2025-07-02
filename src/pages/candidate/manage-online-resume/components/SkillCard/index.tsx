import { Card, Table, Tooltip, Button, Empty, Form } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import  { skillActions } from "../../../../../stores/skillStore/skillReducer";
import type { ISkill } from "../../../../../types/resume/SkillType";
import SkillModal from "./components/SkillModal";


const columns = (
  onEdit: (record: ISkill) => void,
  onDelete: (id: number) => void,
  isSubmitting:boolean
) => [
  {
    title: "Kĩ năng",
    dataIndex: "name",
    key: "name",
    align: "left" as const,
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
    render: (_: any, record: ISkill) => (
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

const SkillCard = () => {
  const [form] = Form.useForm<ISkill>()
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)
  const { skills, isSubmitting, loading } = useSelector((state: RootState) => state.onlineResumeStore)


  const showModal = () => {
    setSelectedSkill(null)
    setIsModalOpen(true);
  }

  const handleSubmit = (data: ISkill) => {
    const isEditing = Boolean(data.id);

    const action = isEditing
      ? skillActions.updateSkill(data)
      : skillActions.createSkill(data);
  
    dispatch(action)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  }
 
  const handleEdit = (data: ISkill) => {
    setSelectedSkill(data)
    setIsModalOpen(true)
  }

  const handleDelete = (skillId: number) => {
    dispatch(skillActions.deleteSkill(skillId))
  }

  return (
    <>
      <Card title={"Kỹ năng chuyên môn"}
        extra={
          <span
            className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center"
            onClick={showModal}
          >
            <span className="text-lg mr-1 leading-none"></span> + Thêm kĩ năng
          </span>
        }
        loading={loading.skills}
      >
        {skills.length > 0 ? (
          <Table
            columns={columns(handleEdit, handleDelete,isSubmitting.skills)}
            dataSource={skills}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có kỹ năng ngôn ngữ nào." />
        )}
      </Card>
      <SkillModal
         form={form}
         open={isModalOpen}
         onSubmit={handleSubmit}
         onCancel={handleCancel}
         initialValues={selectedSkill}
      />
    </>
  )
}

export default SkillCard
