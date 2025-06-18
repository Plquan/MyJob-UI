import { Form } from "antd"
import { useEffect, useState } from "react"
import CertificateModal from "./components/CertificateModal"
import CertificateCard from "./components/CertificateCard"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../../stores"
import { certificateActions } from "../../../../../../stores/certificateStore/certificateReducer"
import type { ICertificate} from "../../../../../../types/resume/CertificateType"

const CertificateSkillCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<ICertificate | null>(null)
  const { certificates, isSubmitting, loading } = useSelector((state: RootState) => state.certificateStore);
  const [form] = Form.useForm<ICertificate>()

  useEffect(() => {
    dispatch(certificateActions.getAllCertificates())
  },[dispatch])
  
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleFinish = (data: ICertificate) => {
    console.log(data)
    if(!editingCertificate){
      dispatch(certificateActions.createCertificate(data))
    }
    else{  
      dispatch(certificateActions.updateCertificate({
        ...data,
        id: editingCertificate?.id,
      }))
    }
    setIsModalOpen(false)
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
    dispatch(certificateActions.deleteCertificate(id))
  }

  return (
    <>
      <CertificateCard
        certificates={certificates}
        loading={loading}
        isSubmitting={isSubmitting}
        onCreate={showModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CertificateModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
        initialValues={editingCertificate}
        form={form}
      />
    </>
  )
}

export default CertificateSkillCard
