import { Modal, Form, Input, Radio, Button, Spin, Empty } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../stores';
import { attachedResumeActions } from '../../../../stores/attachedResumeStore/attachedResumeReducer';
import type { IResume } from '../../../../types/resume/ResumeType';
import type { IJobPost } from '../../../../types/job-post/JobPostType';
import { jobPostActions } from '../../../../stores/jobPostStore/jobPostReducer';

interface ApplyJobModalProps {
  open: boolean;
  onCancel: () => void;
  jobPost: IJobPost;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ open, onCancel, jobPost }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);

  const { attachedResumes, loading: loadingResumes } = useSelector(
    (state: RootState) => state.attachedResumeStore
  );
  const { candidate } = useSelector((state: RootState) => state.onlineResumeStore);
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const { loading: isSubmitting } = useSelector((state: RootState) => state.jobPostStore);

  // Load resumes and candidate profile when modal opens
  useEffect(() => {
    if (open) {
      dispatch(attachedResumeActions.getResumes());
    }
  }, [open, dispatch]);

  // Pre-fill form with user data
  useEffect(() => {
    if (open && currentUser && candidate) {
      form.setFieldsValue({
        fullName: currentUser?.candidate?.fullName || '',
        email: currentUser.email || '',
        phone: currentUser?.candidate?.phone || '',
      });
    }
  }, [open, currentUser, candidate, form]);

  // Auto-select first resume if available
  useEffect(() => {
    if (open && attachedResumes && attachedResumes.length > 0 && !selectedResumeId) {
      setSelectedResumeId(attachedResumes[0].id);
    }
  }, [open, attachedResumes, selectedResumeId]);

  const handleResumeSelect = (resumeId: number) => {
    setSelectedResumeId(resumeId);
  };

  const handleViewResume = (resume: IResume) => {
    if (resume.myJobFile?.url) {
      window.open(resume.myJobFile.url, '_blank');
    }
  };

  const handleSubmit = async () => {
    if (!selectedResumeId) {
      return;
    }
    const values = await form.validateFields();

    await dispatch(jobPostActions.applyJob({
      jobPostId: jobPost.id,
      resumeId: selectedResumeId,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
    }));
    onCancel();
  };

  const isLoading = loadingResumes;
  const hasAttachedResumes = attachedResumes && attachedResumes.length > 0;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <span className="text-xl font-bold text-gray-900">
          Ứng tuyển vị trí {jobPost?.jobName || ''}
        </span>
      }
      footer={null}
      width={700}
      centered
      className="apply-job-modal"
    >
      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : !hasAttachedResumes ? (
          <div className="py-8">
            <Empty
              description="Bạn chưa có hồ sơ đính kèm nào. Vui lòng tạo hồ sơ trước khi ứng tuyển."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <>
            {/* Resume Selection Section */}
            <div className="mb-6">
              <div className="space-y-3">
                {/* Attached Resumes */}
                {attachedResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedResumeId === resume.id
                        ? 'border-[#6A5ACD] bg-[#6A5ACD]/5'
                        : 'border-gray-200 hover:border-[#6A5ACD]/50'
                      }`}
                    onClick={() => handleResumeSelect(resume.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Radio
                        checked={selectedResumeId === resume.id}
                        onChange={() => handleResumeSelect(resume.id)}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">
                          {resume.title || 'Hồ sơ đính kèm'}
                        </div>
                        <div className="text-sm text-gray-600">Hồ sơ đính kèm</div>
                      </div>
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewResume(resume);
                        }}
                      >
                        Xem hồ sơ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Form form={form} layout="vertical">
                <Form.Item
                  name="fullName"
                  label={<span className="font-medium">Họ và tên</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="font-medium">Email</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<span className="font-medium">Số điện thoại</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Form>
              <p className="text-xs text-gray-500 mt-2">
                Lưu ý: Họ tên, email, số điện thoại cần chính xác để nhà tuyển dụng liên hệ với bạn.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!selectedResumeId}
                className="bg-[#6A5ACD]! border-[#6A5ACD]! hover:opacity-90"
              >
                Ứng tuyển
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ApplyJobModal;

