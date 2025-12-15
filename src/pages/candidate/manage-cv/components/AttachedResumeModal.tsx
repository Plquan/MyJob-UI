import { Modal, Form, Input, Select, Button, Upload, message } from "antd";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import type { RootState } from "../../../../stores";
import type { IResume } from "../../../../types/resume/ResumeType";
import { POSITION_OPTIONS, 
  ACADEMICLEVEL_OPTIONS, 
  EXPERIENCE_OPTIONS, 
  WORKPLACE_OPTIONS, 
  JOBTYPE_OPTIONS } from "../../../../constant/selectOptions"
const { Option } = Select;

interface AttachedResumeModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  initialValues?: IResume | null
  form:any
}
const AttachedResumeModal: React.FC<AttachedResumeModalProps> = ({ open, onCancel, initialValues, onFinish,form }) => {
  const { careers } = useSelector((state: RootState) => state.careerStore)
  const { provinces } = useSelector((state: RootState) => state.provinceStore)

  useEffect(() => {
    if (open) {
      if (initialValues?.id) {
        const { myJobFile, ...rest } = initialValues;
        const fileList = myJobFile?.url
          ? [
              {
                uid: '-1',
                name: myJobFile.url.split('/').pop() || 'CV.pdf',
                status: 'done',
                url: myJobFile.url,
              },
            ]
          : []
        form.setFieldsValue({
          ...rest,
          file: fileList,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form])
  

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
        onFinish={onFinish}
        className="max-h-[80vh] overflow-y-scroll pr-3!"
      >
        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>
        
      <Form.Item
        name="file"
        label={<span>Chọn tệp CV của bạn (Hỗ trợ *.doc, *.docx, *.pdf, và &lt; 10MB)</span>}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Vui lòng tải lên tệp CV" }]}
      >
       <Upload
        beforeUpload={(file) => {
          const maxSize = 10 * 1024 * 1024; // 10MB
          if (file.size > maxSize) {
            message.error(`File không được vượt quá 10MB. File của bạn: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            return Upload.LIST_IGNORE;
          }
          return false; // Prevent auto upload
        }}
        accept=".pdf,.doc,.docx"
        maxCount={1}
        listType="text"
        showUploadList={{ showDownloadIcon: true }}
      >

          <Button icon={<UploadOutlined />} type="primary">
            Tải file
          </Button>
        </Upload>
      </Form.Item>


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
        <div className="flex justify-end space-x-2 gap-2 mb-5 ">
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="primary" htmlType="submit">Lưu</Button>
      </div>
      </Form>
    </Modal>
  );
};

export default AttachedResumeModal; 