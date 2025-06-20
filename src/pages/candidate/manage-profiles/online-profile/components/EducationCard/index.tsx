import { Button, Card, Empty, Form } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../../stores";
import type { ICertificateData } from "../../../../../../types/resume/ResumeType";
import EducationModal from "./components/EducationModal";
import type { IEducation } from "../../../../../../types/resume/EducationType";
import { educationActions } from "../../../../../../stores/educationStore/educationReducer";
import  { normalizeDate } from "../../../../../../ultils/functions/normalizeDate";
import { EditOutlined, DeleteOutlined, CaretDownOutlined } from "@ant-design/icons";

const EducationCard = () => {
  const [form] = Form.useForm<ICertificateData>()
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null)
  const [selectedEducation, setSelectedEducation] = useState<IEducation | null>(null)
  const { educations, isSubmitting, loading } = useSelector((state: RootState) => state.educationStore)

  useEffect(() => {
    dispatch(educationActions.getAllEducations())
  },[dispatch])
  
  const showModal = () => {
    setSelectedEducation(null)
    setIsModalOpen(true);
  }

  const handleSubmit = (data: IEducation) => {
    const isEditing = Boolean(data.id);

    const action = isEditing
      ? educationActions.updateEducation(data)
      : educationActions.createEducation(data);
  
    dispatch(action)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  }
 
  const handleEdit = (data: IEducation) => {
    setSelectedEducation(data)
    setIsModalOpen(true)
  }

  const handleDelete = (educationId: number) => {
    dispatch(educationActions.deleteEducation(educationId))
  }

  return (
    <>
     <Card title={"Thông tin học vấn"} 
      extra = {
        <a onClick={showModal} className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
        <span className="text-lg mr-1 leading-none"></span> + Thêm thông tin học vấn
      </a>}
      loading={loading}
      >
      { educations && educations.length > 0 ? (
            educations.map((item) => (
              <div className="mb-2" key={item.id}>
              <div className="flex items-start gap-2 mb-1">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-300 inline-block"></span>
                <span className="text-medium ">
                {normalizeDate(item?.startDate)?.format("DD/MM/YYYY") ?? "?"}
                &nbsp;–&nbsp;
                {item?.completedDate
                  ? normalizeDate(item.completedDate)?.format("DD/MM/YYYY")
                  : "Hiện tại"}
                </span>
                </div>
                <div className="ml-1 border-l-2 border-gray-300 pl-4">
                  <div className="font-semibold mb-1">{item.degreeName}</div>
                  <div className="text-medium">{item.trainingPlace}</div>
                  <div className="text-sm italic text-gray-500 mb-1">{item.major}</div>
                  <div className="flex gap-2">
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        loading={isSubmitting}
                        size="small"
                        onClick={() => handleEdit(item)}
                        className="text-yellow-500! border-yellow-500 hover:!text-yellow-600 hover:!border-yellow-600"
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        loading={isSubmitting}
                        type="text"
                        size="small"
                        danger
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  <hr className="my-2 mb-2 text-gray-300" />
                  <div className="flex items-center  justify-between mb-1">
                    <div className="font-sm text-gray-500">Mô tả chi tiết</div>
                    <span className="cursor-pointer" onClick={() => setOpenDescriptionId(openDescriptionId === item.id ? null : item.id)}>
                      <CaretDownOutlined className={`${openDescriptionId === item.id ? 'rotate-180' : ''} transition-all duration-300`} />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${
                      openDescriptionId === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                    <div className="text-medium">{item.description}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Hiện chưa có thông tin học vấn."} />
          )}
    </Card>

      <EducationModal
       open={isModalOpen}
       onSubmit={handleSubmit}
       onCancel={handleCancel}
       initialValues={selectedEducation}
       form={form}
      />

    </>
  )
}

export default EducationCard;