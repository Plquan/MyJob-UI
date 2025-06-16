import { Modal, Form, Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../../stores";
import { ACADEMICLEVEL_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS, POSITION_OPTIONS, WORKPLACE_OPTIONS } from "../../../../../../../constant/selectOptions";
import type { IResumeData } from "../../../../../../../types/resume/ResumeType";

const { Option } = Select;

interface EditResumeModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: IResumeData;
}
const ProfileEditModal: React.FC<EditResumeModalProps> = ({ open, onCancel, initialValues, onFinish }) => {
  const { careers } = useSelector((state: RootState) => state.careerStore)
  const { provinces } = useSelector((state: RootState) => state.provinceStore)
  const [form] = Form.useForm<IResumeData>()
  
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className="font-sm text-lg">Thông tin hồ sơ</span>}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Form.Item
            name="title"
            label={<span>Vị trí mong muốn</span>}
            rules={[{ required: true, message: "Vui lòng nhập vị trí mong muốn" }]}
          >
            <Input placeholder="Nhập vị trí mong muốn" />
          </Form.Item>
          <Form.Item
            name="position"
            label={<span>Cấp bậc mong muốn</span>}
            rules={[{ required: true, message: "Vui lòng chọn cấp bậc" }]}
          >
            <Select placeholder="Chọn cấp bậc">
            {POSITION_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="academicLevel"
            label={<span>Trình độ học vấn</span>}
            rules={[{ required: true, message: "Vui lòng chọn trình độ học vấn" }]}
          >
            <Select placeholder="Chọn trình độ học vấn">
            {ACADEMICLEVEL_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="experience"
            label={<span>Kinh nghiệm làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn kinh nghiệm" }]}
          >
            <Select placeholder="Chọn kinh nghiệm">
            {EXPERIENCE_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="careerId"
            label={<span>Nghề nghiệp</span>}
            rules={[{ required: true, message: "Vui lòng chọn nghề nghiệp" }]}
          >
            <Select placeholder="Chọn nghề nghiệp">
              {careers?.map((career) => (
                <Option key={career.id} value={career.id}>{career.icon} {career.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="provinceId"
            label={<span>Tỉnh/Thành phố</span>}
            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố">
            {provinces?.map((province) => (
                <Option key={province.id} value={province.id}>{province.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="salaryMin"
            label={<span>Mức lương mong muốn tối thiểu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mức lương tối thiểu" }]}
          >
            <Input addonBefore="VND" placeholder="Nhập mức lương mong muốn tối thiểu" type="number" />
          </Form.Item>
          <Form.Item
            name="salaryMax"
            label={<span>Mức lương mong muốn tối đa</span>}
            dependencies={['salaryMin']}
            rules={[
              { required: true, message: "Vui lòng nhập mức lương tối đa" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('salaryMin') || Number(value) > Number(getFieldValue('salaryMin'))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mức lương tối đa phải lớn hơn mức lương tối thiểu'));
                },
              }),
            ]}
          >
            <Input addonBefore="VND" placeholder="Nhập mức lương mong muốn tối đa" type="number" />
          </Form.Item>
          <Form.Item
            name="typeOfWorkPlace"
            label={<span>Nơi làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn nơi làm việc" }]}
          >
            <Select placeholder="Chọn nơi làm việc">
            {WORKPLACE_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="jobType"
            label={<span>Hình thức làm việc</span>}
            rules={[{ required: true, message: "Vui lòng chọn hình thức làm việc" }]}
          >
            <Select placeholder="Chọn hình thức làm việc">
            {JOBTYPE_OPTIONS.map(opt => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          label={<span>Mục tiêu nghề nghiệp</span>}
        >
          <Input.TextArea rows={3} placeholder="Nhập nội dung tại đây" />
        </Form.Item>
        <div className="flex justify-end mt-6 space-x-2 gap-2">
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </div>
      </Form>
    </Modal>
  );
};

export default ProfileEditModal; 