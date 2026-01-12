import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Spin,
    Empty,
    Button,
    Typography,
    Divider,
    Space,
    message,
    Avatar,
    Descriptions
} from 'antd';
import {
    ArrowLeftOutlined,
    DownloadOutlined,
    UserOutlined,
    EyeOutlined,
    MailOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { jobPostActivityActions } from '../../../stores/jobPostActivityStore/jobPostActivityReducer';
import {
    POSITION_OPTIONS,
    ACADEMICLEVEL_OPTIONS,
    EXPERIENCE_OPTIONS,
    WORKPLACE_OPTIONS,
    JOBTYPE_OPTIONS,
    GENDER_OPTIONS,
    MARTIALSTATUS_OPTIONS
} from '../../../constant/selectOptions';
import { EResumeType } from '../../../enums/resume/EResumeType';
import resumeService from '../../../services/resumeService';
import SendEmailModal from '../SendEmailModal';

const { Title, Text } = Typography;

interface ResumeDetailViewProps {
    jobPostActivityId: string;
    onBackPath: string;
    onFetchErrorPath: string;
}

const ResumeDetailView = ({
    jobPostActivityId,
    onBackPath,
    onFetchErrorPath
}: ResumeDetailViewProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [activityDetail, setActivityDetail] = useState<any>(null);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const { provinces } = useSelector((state: RootState) => state.provinceStore);

    useEffect(() => {
        if (!provinces || provinces.length === 0) {
            dispatch({ type: 'province/getAllProvinces' } as any);
        }
    }, [dispatch, provinces]);

    useEffect(() => {
        if (jobPostActivityId) {
            fetchActivityDetail();
        }
    }, [jobPostActivityId]);

    const fetchActivityDetail = async () => {
        if (!jobPostActivityId) return;

        setLoading(true);
        try {
            const result = await dispatch(
                jobPostActivityActions.getJobPostActivityById(parseInt(jobPostActivityId))
            ).unwrap();
            setActivityDetail(result);
        } catch (error) {
            message.error('Không thể tải thông tin hồ sơ');
            navigate(onFetchErrorPath);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(onBackPath);
    };

    const handleOpenEmailModal = () => {
        setIsEmailModalOpen(true);
    };

    const handleCloseEmailModal = () => {
        setIsEmailModalOpen(false);
    };

    const handleSendEmail = async (values: { to: string; subject: string; content: string }) => {
        setSendingEmail(true);
        try {
            const jobPostActivityService = (await import('../../../services/jobPostActivityService')).default;
            await jobPostActivityService.sendEmailToCandidate(values);
            message.success('Gửi email thành công!');
            handleCloseEmailModal();
        } catch (error) {
            console.error('Send email error:', error);
            message.error('Không thể gửi email. Vui lòng thử lại!');
        } finally {
            setSendingEmail(false);
        }
    };

    const handleDownloadCV = async () => {
        if (!activityDetail?.resume) {
            message.warning('Không tìm thấy thông tin CV');
            return;
        }

        const resume = activityDetail.resume;

        try {
            if (resume.type === EResumeType.ONLINE) {
                message.loading({ content: 'Đang tải CV...', key: 'download' });
                await resumeService.getResumeForDownload(resume.id);
                message.success({ content: 'Tải CV thành công', key: 'download' });
            } else {
                if (resume.myJobFile?.url) {
                    window.open(resume.myJobFile.url, '_blank');
                } else {
                    message.warning('Không tìm thấy file CV đính kèm');
                }
            }
        } catch (error) {
            console.error('Download error:', error);
            message.error('Không thể tải CV. Vui lòng thử lại!');
        }
    };

    const getLabel = (value: number | undefined, options: any[]) => {
        if (!value) return 'N/A';
        return options.find(opt => opt.value === value)?.label || 'N/A';
    };

    const getProvinceName = (provinceId?: number) => {
        if (!provinceId) return 'N/A';
        return provinces?.find(p => p.id === provinceId)?.name || 'N/A';
    };

    const formatDate = (date?: Date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('vi-VN');
    };

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return 'Thỏa thuận';
        if (min && max) return `${min} - ${max} triệu`;
        if (min) return `Từ ${min} triệu`;
        if (max) return `Đến ${max} triệu`;
        return 'Thỏa thuận';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Spin size="large" />
            </div>
        );
    }

    if (!activityDetail) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Empty description="Không tìm thấy thông tin hồ sơ" />
            </div>
        );
    }

    const { resume, fullName, email, phone, updatedAt } = activityDetail;
    const candidate = resume?.candidate;

    return (
        <Card
            title={
                <>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBack}
                        type="text"
                    />
                    <span className="text-base font-semibold text-gray-800">Chi tiết hồ sơ</span>
                </>
            }
        >
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <div className="flex items-start gap-6">
                    <Avatar
                        size={100}
                        src={candidate?.avatar?.url}
                        icon={<UserOutlined />}
                        className="border-2 border-gray-100 flex-shrink-0 bg-orange-100 text-orange-600"
                    />
                    <div>
                        <Title level={2} className="mb-2! !mt-0 !text-gray-800">
                            {fullName || candidate?.fullName || 'N/A'}
                        </Title>
                        <div className="text-base text-black font-medium mb-2">
                            {resume?.title || 'Lập trình viên'}
                        </div>
                        <Space direction="vertical" size={2}>
                            <Text
                                type="secondary"
                                className="text-[11px]! bg-[#154C91]/80 px-2 py-1 rounded-full text-white!">
                                Cập nhật lần cuối: <span>{formatDate(updatedAt)}</span>
                            </Text>

                            <div className="flex items-center mt-4 gap-2 ">
                                <div className="flex items-center gap-2">
                                    <Button
                                        icon={<MailOutlined />}
                                        className="!text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                        onClick={handleOpenEmailModal}
                                    >
                                        Gửi mail
                                    </Button>
                                    <Button
                                        icon={<MessageOutlined />}
                                        className="!text-green-600 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Liên hệ
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        icon={<EyeOutlined />}
                                        onClick={handleDownloadCV}
                                        className="!text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        Xem CV
                                    </Button>
                                    <Button
                                        icon={<DownloadOutlined />}
                                        onClick={handleDownloadCV}
                                        className="!text-green-600 hover:bg-green-50 hover:text-green-600"
                                    >
                                        Tải xuống
                                    </Button>
                                </div>
                            </div>

                        </Space>
                    </div>
                </div>


            </div>

            <Divider />

            <div className="mb-8">
                <Title level={4} className="mb-6 !text-gray-800">Thông tin cá nhân</Title>
                <Descriptions layout="vertical" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} colon={false}>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Email</span>}>
                        <span className="text-gray-800">{email || candidate?.email || 'N/A'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-black">Số điện thoại</span>}>
                        <span className="text-gray-800">{phone || candidate?.phone || 'N/A'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Giới tính</span>}>
                        <span className="text-gray-800">{getLabel(candidate?.gender, GENDER_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Ngày sinh</span>}>
                        <span className="text-gray-800">{formatDate(candidate?.birthday)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Tình trạng hôn nhân</span>}>
                        <span className="text-gray-800">{getLabel(candidate?.maritalStatus, MARTIALSTATUS_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Tỉnh/Thành phố</span>}>
                        <span className="text-gray-800">{candidate?.address?.split(',').pop()?.trim() || 'TP.HCM'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Địa chỉ</span>} span={2}>
                        <span className="text-gray-800">{candidate?.address || 'N/A'}</span>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <Divider dashed />

            <div className="mb-8">
                <Title level={4} className="mb-6 !text-gray-800">Thông tin chung</Title>
                <Descriptions layout="vertical" column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} colon={false}>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Vị trí mong muốn</span>}>
                        <span className="text-gray-800">{getLabel(resume?.position, POSITION_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Cấp bậc mong muốn</span>}>
                        <span className="text-gray-800">Nhân viên</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Trình độ học vấn</span>}>
                        <span className="text-gray-800">{getLabel(resume?.academicLevel, ACADEMICLEVEL_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Kinh nghiệm</span>}>
                        <span className="text-gray-800">{getLabel(resume?.experience, EXPERIENCE_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Nghề nghiệp</span>}>
                        <span className="text-gray-800">IT Phần mềm</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Địa điểm làm việc</span>}>
                        <span className="text-gray-800">{getProvinceName(resume?.provinceId)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Mức lương mong muốn</span>}>
                        <span className="text-gray-800">{formatSalary(resume?.salaryMin, resume?.salaryMax)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Nơi làm việc</span>}>
                        <span className="text-gray-800">{getLabel(resume?.typeOfWorkPlace, WORKPLACE_OPTIONS)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="font-semibold text-sm text-black">Hình thức làm việc</span>}>
                        <span className="text-gray-800">{getLabel(resume?.jobType, JOBTYPE_OPTIONS)}</span>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <Divider dashed />

            <div>
                <Title level={4} className="mb-4 !text-gray-800">Mục tiêu nghề nghiệp</Title>
                <div className="p-2 rounded border border-gray-200">
                    {resume?.description || 'Chưa cập nhật mục tiêu nghề nghiệp.'}
                </div>
            </div>

            {/* Modal gửi email */}
            <SendEmailModal
                open={isEmailModalOpen}
                toEmail={email || candidate?.email || ''}
                onCancel={handleCloseEmailModal}
                onSend={handleSendEmail}
                loading={sendingEmail}
            />
        </Card>
    );
};

export default ResumeDetailView;
