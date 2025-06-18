import { Button, Card, Empty } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import type { ICertificate } from "../../../../../../../types/resume/CertificateType"
import { normalizeDate } from "../../../../../../../ultils/functions/normalizeDate";

interface CertificateCardProps {
  certificates: ICertificate[];
  loading: boolean;
  isSubmitting: boolean;
  onCreate: () => void;
  onEdit: (certificate: ICertificate) => void;
  onDelete: (id: number) => void;
}

const CertificateCard = ({
  certificates,
  loading,
  isSubmitting,
  onCreate,
  onEdit,
  onDelete
}: CertificateCardProps) => {
  return (
    <Card 
      title={"Chứng chỉ"}
      loading={loading}
      extra={
        <a
          className="text-xs text-[#1976d2] hover:underline cursor-pointer flex items-center"
          onClick={onCreate}
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
              <span className="text-medium">{normalizeDate(item.startDate)?.format("DD/MM/YYYY")}</span>
            </div>
            <div className="ml-1 border-l-2 border-gray-300 pl-4">
              <div className="font-semibold mb-1">{item.name}</div>
              <div className="text-medium mb-1">{item.trainingPlace}</div>
              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  loading={isSubmitting}
                  size="small"
                  onClick={() => onEdit(item)}
                  className="text-yellow-500! border-yellow-500 hover:!text-yellow-600 hover:!border-yellow-600"
                />
                <Button
                  icon={<DeleteOutlined />}
                  loading={isSubmitting}
                  type="text"
                  size="small"
                  danger
                  onClick={() => onDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Chưa có chứng chỉ nào."} />
      )}
    </Card>
  )
}

export default CertificateCard 