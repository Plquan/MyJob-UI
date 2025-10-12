import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Alert,
  Row,
  Col,
  Button
} from 'antd';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POSITION_OPTIONS, EXPERIENCE_OPTIONS, JOBTYPE_OPTIONS, GENDER_OPTIONS, ACADEMICLEVEL_OPTIONS, WORKPLACE_OPTIONS } from '../../../../constant/selectOptions';
import type { AppDispatch, RootState } from '../../../../stores';
import { careerActions } from '../../../../stores/careerStore/careerReducer';
import { provinceActions } from '../../../../stores/provinceStore/provinceReducer';
import { jobPostActions } from '../../../../stores/jobPostStore/jobPostReducer';
import type { ICreateJobPostReq } from '../../../../types/job-post/JobPostType';


interface CreateJobPostModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const CreateJobPostModal: React.FC<CreateJobPostModalProps> = ({
  visible,
  onCancel,
  onSubmit
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const { careers, loading: careerLoading } = useSelector((state: RootState) => state.careerStore);
  const { provinces, districts, loading: provinceLoading } = useSelector((state: RootState) => state.provinceStore);
  const { loading: jobPostLoading } = useSelector((state: RootState) => state.jobPostStore);

  useEffect(() => {
    if (visible) {
      dispatch(careerActions.getAllCareers());
      dispatch(provinceActions.getAllProvinces());
    }
  }, [visible, dispatch]);

  const handleProvinceChange = (provinceId: number) => {
    form.setFieldsValue({ districtId: undefined });
    if (provinceId) {
      dispatch(provinceActions.getDistrictsByProvince(provinceId));
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const jobPostData: ICreateJobPostReq = {
        ...values,
      };

      await dispatch(jobPostActions.createJobPost(jobPostData));
      form.resetFields();
      onSubmit(values);
    } catch (error) {
      console.error('Error creating job post:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Tin tuyển dụng"
      open={visible}
      onCancel={handleCancel}
      width={700}
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={jobPostLoading}
          onClick={() => form.submit()}
        >
          Lưu
        </Button>,
      ]}
    >
      <Alert
        message="Khi bạn cập nhật bài đăng, nó sẽ ở trạng thái chờ kiểm duyệt!"
        type="warning"
        icon={<ExclamationCircleOutlined />}
        className="mb-4!"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-h-[70vh] overflow-y-auto overflow-x-hidden"
      >
        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Tên công việc"
              name="jobName"
              rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
            >
              <Input placeholder="Nhập tên công việc" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngành nghề"
              name="careerId"
              rules={[{ required: true, message: 'Vui lòng chọn ngành nghề!' }]}
            >
              <Select
                placeholder="Chọn ngành nghề cần tuyển"
                loading={careerLoading}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {careers?.map((career: any) => (
                  <Select.Option key={career.id} value={career.id}>
                    {career.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Vị trí/chức vụ"
              name="position"
              rules={[{ required: true, message: 'Vui lòng chọn vị trí/chức vụ!' }]}
            >
              <Select placeholder="Chọn vị trí/chức vụ">
                {POSITION_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kinh nghiệm"
              name="experience"
              rules={[{ required: true, message: 'Vui lòng chọn kinh nghiệm!' }]}
            >
              <Select placeholder="Chọn kinh nghiệm yêu cầu">
                {EXPERIENCE_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nơi làm việc"
              name="typeOfWorkPlace"
              rules={[{ required: true, message: 'Vui lòng chọn nơi làm việc!' }]}
            >
              <Select placeholder="Chọn nơi làm việc">
                {WORKPLACE_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hình thức làm việc"
              name="jobType"
              rules={[{ required: true, message: 'Vui lòng chọn hình thức làm việc!' }]}
            >
              <Select placeholder="Chọn hình thức làm việc">
                {JOBTYPE_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Số lượng tuyển"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng tuyển!' }]}
            >
              <InputNumber
                placeholder="Nhập số lượng nhân sự cần tuyển"
                min={1}
                className="w-full"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Yêu cầu giới tính"
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn yêu cầu giới tính!' }]}
            >
              <Select placeholder="Chọn giới tính yêu cầu">
                {GENDER_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Mức lương tối thiểu"
              name="salaryMin"
              rules={[{ required: true, message: 'Vui lòng nhập mức lương tối thiểu!' }]}
            >
              <InputNumber
                placeholder="Nhập mức lương tối thiểu"
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className="w-full!"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mức lương tối đa"
              name="salaryMax"
              rules={[{ required: true, message: 'Vui lòng nhập mức lương tối đa!' }]}
            >
              <InputNumber
                placeholder="Nhập mức lương tối đa"
                min={0}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className="w-full!"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Bằng cấp"
              name="academicLevel"
              rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}
            >
              <Select placeholder="Chọn bằng cấp">
                {ACADEMICLEVEL_OPTIONS.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hạn nộp hồ sơ"
              name="deadline"
              rules={[{ required: true, message: 'Vui lòng chọn hạn nộp hồ sơ!' }]}
            >
              <DatePicker
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
                className="w-full"
                style={{ height: '32px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả công việc"
          name="jobDescription"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(_event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ jobDescription: data });
              }}
              config={{
                placeholder: 'Nhập mô tả chi tiết về công việc, yêu cầu, quyền lợi...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Yêu cầu công việc"
          name="jobRequirement"
          rules={[{ required: true, message: 'Vui lòng nhập yêu cầu công việc!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(_event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ jobRequirement: data });
              }}
              config={{
                placeholder: 'Nhập yêu cầu công việc, kỹ năng, kinh nghiệm...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Quyền lợi"
          name="benefitsEnjoyed"
          rules={[{ required: true, message: 'Vui lòng nhập quyền lợi!' }]}
        >
          <div className="ckeditor-wrapper">
            <CKEditor
              editor={ClassicEditor as any}
              data=""
              onChange={(_event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ benefitsEnjoyed: data });
              }}
              config={{
                placeholder: 'Nhập quyền lợi, chế độ đãi ngộ cho ứng viên...',
                toolbar: [
                  'heading', '|',
                  'bold', 'italic', 'underline', '|',
                  'bulletedList', 'numberedList', '|',
                  'outdent', 'indent', '|',
                  'blockQuote', 'insertTable', '|',
                  'undo', 'redo'
                ]
              }}
            />
          </div>
        </Form.Item>

        <Row gutter={16} align="top">
          <Col span={12}>
            <Form.Item
              label="Tỉnh/Thành phố"
              name="provinceId"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
            >
              <Select
                placeholder="Chọn tỉnh thành phố"
                loading={provinceLoading}
                onChange={handleProvinceChange}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {provinces?.map((province: any) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quận/Huyện"
              name="districtId"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
            >
              <Select
                placeholder="Chọn Quận/Huyện"
                loading={provinceLoading}
                disabled={!districts || districts.length === 0}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {districts?.map((district: any) => (
                  <Select.Option key={district.id} value={district.id}>
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>


        <Form.Item
          label="Tên người liên hệ"
          name="contactPersonName"
          rules={[{ required: true, message: 'Vui lòng nhập tên người liên hệ!' }]}
        >
          <Input placeholder="Nhập tên người liên hệ" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại người liên hệ"
          name="contactPersonPhone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9+\-\s()]+$/, message: 'Số điện thoại không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập số điện thoại người liên hệ" />
        </Form.Item>

        <Form.Item
          label="Email người liên hệ"
          name="contactPersonEmail"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email người liên hệ" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateJobPostModal;
