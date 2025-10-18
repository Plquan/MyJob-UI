import { Modal, Form, Rate, Button, Input } from 'antd'
import { useEffect } from 'react'
import type { ISkill } from '../../../../../../types/resume/SkillType'

interface SkillModalProps {
    open: boolean
    onSubmit: (value: ISkill) => void
    onCancel: () => void
    initialValues?: ISkill | null
    form: any
}


const SkillModal = ({ open, onSubmit, onCancel,form, initialValues }: SkillModalProps) => {


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
      title="Kỹ năng chuyên môn"
      footer={null}
      centered
      getContainer={false}
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
          label="Kĩ năng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập kĩ năng!' }]}
        >
        <Input placeholder='VD: Tester, ..'/>
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

export default SkillModal