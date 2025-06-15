import { Modal, Form, Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../../stores";
import { ACADEMICLEVEL_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS, POSITION_OPTIONS, WORKPLACE_OPTIONS } from "../../../../../../../constant/selectOptions";

const { Option } = Select;

const ProfileEditModal = ({ open, onCancel, form, initialValues, onFinish }: any) => {
  const { careers } = useSelector((state: RootState) => state.careerStore)
  const { provinces } = useSelector((state: RootState) => state.provinceStore)


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
            name="position"
            label={<span>Vị trí mong muốn</span>}
            rules={[{ required: true, message: "Vui lòng nhập vị trí mong muốn" }]}
          >
            <Input placeholder="Nhập vị trí mong muốn" />
          </Form.Item>
          <Form.Item
            name="level"
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
            name="education"
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
            name="career"
            label={<span>Nghề nghiệp</span>}
            rules={[{ required: true, message: "Vui lòng chọn nghề nghiệp" }]}
          >
            <Select placeholder="Chọn nghề nghiệp">
              {careers?.map((career) => (
                <Option key={career.id} value={career.name}>{career.icon} {career.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label={<span>Tỉnh/Thành phố</span>}
            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố">
            {provinces?.map((province) => (
                <Option key={province.id} value={province.name}>{province.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="minSalary"
            label={<span>Mức lương mong muốn tối thiểu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mức lương tối thiểu" }]}
          >
            <Input addonBefore="VND" placeholder="Nhập mức lương mong muốn tối thiểu" type="number" />
          </Form.Item>
          <Form.Item
            name="maxSalary"
            label={<span>Mức lương mong muốn tối đa</span>}
            dependencies={['minSalary']}
            rules={[
              { required: true, message: "Vui lòng nhập mức lương tối đa" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('minSalary') || Number(value) > Number(getFieldValue('minSalary'))) {
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
            name="workplace"
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
            name="workType"
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
          name="goal"
          label={<span>Mục tiêu nghề nghiệp</span>}
        >
          <Input.TextArea rows={3} placeholder="Nhập nội dung tại đây" />
        </Form.Item>
        <div className="flex justify-end mt-6 space-x-2 gap-2">
        <Button className="">Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </div>


      </Form>
    </Modal>
  );
};

export default ProfileEditModal; 