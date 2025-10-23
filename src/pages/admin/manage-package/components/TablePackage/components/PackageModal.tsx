import { Modal, Form, Input, Button, InputNumber, Row, Col, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../../stores';
import type { ICreatePackagedata, IUpdatePackageData } from '../../../../../../types/package/PackageType';

const { TextArea } = Input

interface AddPackageModalProps {
  open: boolean;
  onCancel: () => void
  onFinish: (data: ICreatePackagedata | IUpdatePackageData) => void
  form: any
  isEdit?: boolean
}

const PackageModal: React.FC<AddPackageModalProps> = ({
  open,
  onCancel,
  onFinish,
  form,
  isEdit = false
}) => {

  const { isSubmiting } = useSelector((state: RootState) => state.packageStore);

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa gói" : "Thêm gói mới"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên gói"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên gói!' },
                { min: 2, message: 'Tên gói phải có ít nhất 2 ký tự!' },
                { max: 100, message: 'Tên gói không được quá 100 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập tên gói..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[
                { required: true, message: 'Vui lòng nhập giá gói!' },
                { type: 'number', min: 1, message: 'Giá phải lớn hơn 0!' },
                { 
                  validator: (_, value) => {
                    if (value && value > 1000000000) {
                      return Promise.reject(new Error('Giá không được quá 1 tỷ!'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <InputNumber
                placeholder="Nhập giá gói..."
                style={{ width: '100%' }}
                min={1}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Thời hạn gói"
              name="durationInDays"
              rules={[
                { required: true, message: 'Vui lòng nhập thời hạn!' },
              ]}
            >
              <InputNumber
                placeholder="Thời hạn gói"
                style={{ width: '100%' }}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Tin nổi bật (ngày)"
              name="jobHotDurationInDays"
            >
              <InputNumber
                placeholder="Thời hạn tin nổi bật"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Công ty nổi bật (ngày)"
              name="highlightCompanyDurationInDays"
            >
              <InputNumber
                placeholder="Thời hạn công ty nổi bật"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Lượt tìm ứng viên"
              name="candidateSearchLimit"
            >
              <InputNumber
                placeholder="Lượt tìm ứng viên"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Lượt xem hồ sơ"
              name="cvSearchLimit"
            >
              <InputNumber
                placeholder="Lượt xem hồ sơ"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số tin đăng tối đa"
              name="jobPostLimit"
            >
              <InputNumber
                placeholder="Số tin đăng tối đa"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="description"
        >
          <TextArea
            rows={5}
            placeholder="Nhập mô tả gói (không bắt buộc)..."
          />
        </Form.Item>

        <Form.Item
          name="isActive"
          valuePropName="checked"
        >
          <Checkbox>Hoạt động</Checkbox>
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmiting}
          >
            {isEdit ? "Cập nhật" : "Thêm gói"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PackageModal; 