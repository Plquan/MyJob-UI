import { Button, Card, Empty, Form } from "antd";
import { useEffect, useState } from 'react';
import ExperienceModal from "./components/ExperienceModal";
import type { IExperienceData } from "../../../../../../types/resume/ExperienceType";
import { EditOutlined, DeleteOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../../stores";
import { experienceActions } from "../../../../../../stores/experienceStore/experienceReducer";
import { normalizeDate } from "../../../../../../ultils/functions/normalizeDate";

const ExperienceCard = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperienceData | null>(null)
  const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null)
  const { experiences, isSubmitting, loading } = useSelector((state: RootState) => state.experienceStore)

  useEffect(() => {
    if(!experiences || experiences.length === 0){
      dispatch(experienceActions.getAllExperiences())
    }
  },[dispatch])
  
  const showModal = () => {
    setSelectedExperience(null)
    setIsModalOpen(true);
  }

  const handleSubmit = (data: IExperienceData) => {
    const isEditing = Boolean(data.id);

    const action = isEditing
      ? experienceActions.updateExperience(data)
      : experienceActions.createExperience(data);
  
    dispatch(action)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  }
 
  const handleEdit = (data: IExperienceData) => {
    setSelectedExperience(data)
    setIsModalOpen(true)
  }

  const handleDelete = (experienceId: number) => {
    dispatch(experienceActions.deleteExperience(experienceId))
  }
  return (
     <>
      <Card title={"Kinh nghiệm làm việc"} extra={
        <a onClick={showModal} className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center">
          <span className="text-lg mr-1 leading-none"></span> + Thêm kinh nghiệm làm việc
        </a>}
        loading={loading}
        >
        { experiences && experiences.length > 0 ? (
            experiences.map((item) => (
              <div className="mb-2" key={item.id}>
              <div className="flex items-start gap-2 mb-1">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-300 inline-block"></span>
                <span className="text-medium ">
                {normalizeDate(item?.startDate)?.format("DD/MM/YYYY") ?? "?"}
                &nbsp;–&nbsp;
                {item?.endDate
                  ? normalizeDate(item.endDate)?.format("DD/MM/YYYY")
                  : "?"}
                </span>
                </div>
                <div className="ml-1 border-l-2 border-gray-300 pl-4">
                  <div className="font-semibold mb-1">{item.jobName}</div>
                  <div className="text-medium mb-1">{item.companyName}</div>
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
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Hiện chưa có kinh nghiệm làm việc."} />
          )}
        </Card>

        <ExperienceModal 
        form={form}
        open={isModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={selectedExperience}
      />
     </>

   
  );
};

export default ExperienceCard;
