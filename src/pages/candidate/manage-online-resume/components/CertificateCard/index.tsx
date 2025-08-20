import { Button, Card, Empty, Form } from "antd"
import { useState } from "react"
import CertificateModal from "./components/CertificateModal"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../stores"
import type { ICertificate } from "../../../../../types/resume/CertificateType"
import  { normalizeDate } from "../../../../../ultils/functions/normalizeDate"
import { onlineResumeActions } from "../../../../../stores/onlineResumeStore/onlineResumeReducer"

const CertificateCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<ICertificate | null>(null)
  const [form] = Form.useForm<ICertificate>()
  const { certificates, isSubmitting, loading } = useSelector((state: RootState) => state.onlineResumeStore)

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmit = (data: ICertificate) => {
    const isEditing = Boolean(data.id);

    const action = isEditing
      ? onlineResumeActions.updateCertificate(data)
      : onlineResumeActions.createCertificate(data)
  
    dispatch(action)
    setIsModalOpen(false)
    form.resetFields()
  }
  

  const showModal = () => {
    setEditingCertificate(null)
    setIsModalOpen(true)
  }
  
  const handleEdit = (certificate: ICertificate) => {
    setEditingCertificate(certificate)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    dispatch(onlineResumeActions.deleteCertificate(id))
  }

  return (
    <>
    <Card 
      title={"Chứng chỉ"}
      loading={loading.certificates}
      extra={
        <a
          className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center"
          onClick={showModal}
        >
          <span className="text-lg mr-1 leading-none"></span> + Thêm chứng chỉ
        </a>
      }
    >  
      {certificates && certificates.length > 0 ? (
        certificates.map((item) => (
          <div key={item.id} className="mb-2">
            <div className="flex items-start gap-2 mb-1">
              <span className="mt-1 w-2 h-2 rounded-full bg-orange-300 inline-block"></span>
              <span className="text-medium">
              {item?.expirationDate ? (
                <>
                  {normalizeDate(item?.startDate)?.format("DD/MM/YYYY") ?? "?"}
                  &nbsp;–&nbsp;
                  {normalizeDate(item.expirationDate)?.format("DD/MM/YYYY")}
                </>
                ) : (
                  "Không thời hạn"
                )}
              </span>
            </div>
            <div className="ml-1 border-l-2 border-gray-300 pl-4">
              <div className="font-semibold mb-1">{item.name}</div>
              <div className="text-medium mb-1">{item.trainingPlace}</div>
              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  loading={isSubmitting.certificates}
                  size="small"
                  onClick={() => handleEdit(item)}
                  className="text-yellow-500! border-yellow-500 hover:!text-yellow-600 hover:!border-yellow-600"
                />
                <Button
                  icon={<DeleteOutlined />}
                  loading={isSubmitting.certificates}
                  type="text"
                  size="small"
                  danger
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Hiện chưa có chứng chỉ."} />
      )}
    </Card>

      <CertificateModal
        open={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initialValues={editingCertificate}
        form={form}
      />

    </>
  )
}

export default CertificateCard
