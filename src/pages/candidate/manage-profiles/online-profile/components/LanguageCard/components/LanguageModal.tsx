import { Modal, Form, Rate, Button, Select, Input } from 'antd';
import type { ILanguageData } from '../../../../../../../types/resume/LanguageType';
import { useEffect } from 'react';
import { LANGUAGE_OPTIONS } from '../../../../../../../constant/selectOptions';
const { Option } = Select;
interface LanguageModalProps {
    open: boolean
    onSubmit: (value: ILanguageData) => void
    onCancel: () => void
    initialValues?: ILanguageData | null
    form: any
}


const LanguageModal = ({ open, onSubmit, onCancel,form, initialValues }: LanguageModalProps) => {


 useEffect(() => {
    if(open){
        if (initialValues?.id) {
        form.setFieldsValue(initialValues)
        } else {
        form.resetFields()
        }
    }
}, [open,initialValues, form])

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Ngôn ngữ"
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
       
       <Form.Item name="id" noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item
          label="Ngôn ngữ"
          name="language"
          rules={[{ required: true, message: 'Vui lòng chọn ngôn ngữ!' }]}
        >
        <Select placeholder="Chọn ngôn ngữ"> 
        {LANGUAGE_OPTIONS.map(opt => (
            <Option key={opt.value} value={opt.value}>
            {opt.label}
            </Option>
        ))}
        </Select>
        </Form.Item>
        <Form.Item label="Trình độ" name="level" initialValue={3}>
          <Rate allowClear={false} />
        </Form.Item>
        <div className="flex justify-end space-x-2 gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default LanguageModal; 