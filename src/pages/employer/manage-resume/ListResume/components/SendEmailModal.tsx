import { Modal, Form, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import { IJobPostActivityDto } from '@/types/job-post-activity/JobPostActivity';

interface SendEmailModalProps {
    open: boolean;
    activity: IJobPostActivityDto | null;
    onCancel: () => void;
    onSend: (values: { to: string; subject: string; content: string }) => void;
    loading?: boolean;
}

const SendEmailModal = ({
    open,
    activity,
    onCancel,
    onSend,
    loading = false,
}: SendEmailModalProps) => {
    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && activity) {
            form.setFieldsValue({
                to: activity.email || '',
                subject: '',
                content: '',
            });
            setEditorContent('');
        }
    }, [open, activity, form]);

    const handleCancel = () => {
        form.resetFields();
        setEditorContent('');
        onCancel();
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            await onSend(values);
            form.resetFields();
            setEditorContent('');
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title="Gửi email"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={submitting}>
                    Hủy
                </Button>,
                <Button key="send" type="primary" onClick={handleSubmit} loading={submitting || loading}>
                    Gửi email
                </Button>,
            ]}
            width={800}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-4"
            >
                <Form.Item
                    label="Tới"
                    name="to"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email người nhận!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập email người nhận" />
                </Form.Item>

                <Form.Item
                    label="Tiêu đề"
                    name="subject"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tiêu đề email" />
                </Form.Item>

                <Form.Item
                    label="Nội dung email"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung email!' }]}
                >
                    <div className="ckeditor-wrapper">
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={editorContent}
                            onChange={(_event, editor) => {
                                const data = editor.getData();
                                setEditorContent(data);
                                form.setFieldsValue({ content: data });
                            }}
                            config={{
                                placeholder: 'Nhập nội dung email...',
                                toolbar: [
                                    'bold', 'italic', 'underline', '|',
                                    'superscript', 'subscript', '|',
                                    'bulletedList', 'numberedList', '|',
                                    'alignment:left', 'alignment:center', '|',
                                    'undo', 'redo'
                                ],
                            }}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SendEmailModal;

