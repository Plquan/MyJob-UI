import {
    Modal,
    Button,
    Space,
    Tag,
    Descriptions
} from 'antd';
import {
    MailOutlined,
    DeleteOutlined,
    UserOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import type { IJobPostActivityDto } from '../../../../types/job-post-activity/JobPostActivity';
import { POSITION_OPTIONS } from '../../../../constant/selectOptions';
import { EResumeType } from '../../../../enums/resume/EResumeType';
import { EJobPostActivityStatus } from '../../../../enums/job-post-activity/EJobPostActivity';

interface ViewResumeModalProps {
    open: boolean;
    activity: IJobPostActivityDto | null;
    onClose: () => void;
    onSendEmail: (activity: IJobPostActivityDto) => void;
    onDelete: (activity: IJobPostActivityDto) => void;
}

const ViewResumeModal = ({
    open,
    activity,
    onClose,
    onSendEmail,
    onDelete,
}: ViewResumeModalProps) => {
    // Lấy loại hồ sơ
    const getResumeType = (resume?: IJobPostActivityDto['resume']) => {
        if (!resume) return 'N/A';
        return resume.type === EResumeType.ONLINE ? 'CV Online' : 'CV Đính kèm';
    };

    // Lấy label position
    const getPositionLabel = (position?: number) => {
        if (!position) return 'N/A';
        return POSITION_OPTIONS.find(opt => opt.value === position)?.label || 'N/A';
    };

    // Status tag
    const getStatusTag = (status: number) => {
        const statusConfig = {
            [EJobPostActivityStatus.PENDING]: { color: 'orange', text: 'Chờ xử lý' },
            [EJobPostActivityStatus.CONTACTED]: { color: 'cyan', text: 'Đã liên hệ' },
            [EJobPostActivityStatus.TESTED]: { color: 'blue', text: 'Đã test' },
            [EJobPostActivityStatus.INTERVIEWED]: { color: 'purple', text: 'Đã phỏng vấn' },
            [EJobPostActivityStatus.ACCEPTED]: { color: 'green', text: 'Đã chấp nhận' },
            [EJobPostActivityStatus.REJECTED]: { color: 'red', text: 'Đã từ chối' },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: 'Không xác định' };
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    const handleDelete = () => {
        if (activity) {
            onDelete(activity);
            onClose();
        }
    };

    const handleSendEmail = () => {
        if (activity) {
            onSendEmail(activity);
        }
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-blue-500" />
                    <span className="font-semibold">Chi tiết hồ sơ</span>
                </div>
            }
            open={open}
            onCancel={onClose}
            footer={[
                <Space key="actions" size="middle">
                    <Button
                        type="primary"
                        icon={<MailOutlined />}
                        onClick={handleSendEmail}
                        disabled={!activity?.email || activity?.isSentMail}
                    >
                        Gửi email
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={handleDelete}
                    >
                        Xóa
                    </Button>
                    <Button onClick={onClose}>
                        Đóng
                    </Button>
                </Space>
            ]}
            width={900}
            centered
        >
            {activity && (
                <div className="py-1">
                    {/* Thông tin ứng viên */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">
                            <UserOutlined className="text-blue-500" />
                            Thông tin ứng viên
                        </h3>
                        <Descriptions
                            bordered
                            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                            size="small"
                            labelStyle={{
                                fontWeight: 600,
                                backgroundColor: '#fafafa',
                                width: '20%'
                            }}
                        >
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <UserOutlined />
                                        Tên ứng viên
                                    </span>
                                }
                            >
                                <span className="font-medium text-gray-800">
                                    {activity.fullName || 'N/A'}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <MailOutlined />
                                        Email
                                    </span>
                                }
                            >
                                {activity.email ? (
                                    <a
                                        href={`mailto:${activity.email}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {activity.email}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">N/A</span>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <PhoneOutlined />
                                        Số điện thoại
                                    </span>
                                }
                            >
                                {activity.phone ? (

                                    activity.phone

                                ) : (
                                    <span className="text-gray-400">N/A</span>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <EnvironmentOutlined />
                                        Vị trí ứng tuyển
                                    </span>
                                }
                            >
                                <Tag color="blue">{getPositionLabel(activity.resume?.position)}</Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>

                    {/* Thông tin hồ sơ */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">
                            <FileTextOutlined className="text-green-500" />
                            Thông tin hồ sơ
                        </h3>
                        <Descriptions
                            bordered
                            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                            size="small"
                            labelStyle={{
                                fontWeight: 600,
                                backgroundColor: '#fafafa',
                                width: '20%'
                            }}
                        >
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <FileTextOutlined />
                                        Loại hồ sơ
                                    </span>
                                }
                            >
                                <Tag color={activity.resume?.type === EResumeType.ONLINE ? 'blue' : 'purple'}>
                                    {getResumeType(activity.resume)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <FileTextOutlined />
                                        {activity.resume?.type === EResumeType.ONLINE ? 'CV trực tuyến' : 'CV đính kèm'}
                                    </span>
                                }
                                contentStyle={{
                                    overflow: 'hidden',
                                    maxWidth: 0
                                }}
                            >
                                {activity.resume?.type === EResumeType.ONLINE ? (
                                    <div className="flex items-center gap-2">
                                        <span className=" text-blue-600">{activity.resume?.title || 'Chưa có tiêu đề'}</span>
                                        <DownloadOutlined
                                            className="text-blue-500!"
                                            onClick={() => {
                                                console.log('Download online resume:', activity.resume?.id);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    activity.resume?.myJobFile?.url ? (
                                        <div className="flex items-center gap-2 min-w-0 w-full">
                                            <a
                                                href={activity.resume.myJobFile.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 truncate flex-1 min-w-0 overflow-hidden"
                                                title={activity.resume.myJobFile.url}
                                                style={{ maxWidth: '100%' }}
                                            >
                                                {activity.resume.myJobFile.url}
                                            </a>
                                            <DownloadOutlined
                                                className="text-blue-500! flex-shrink-0"
                                                onClick={() => window.open(activity.resume?.myJobFile?.url, '_blank')}
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        Tên hồ sơ
                                    </span>
                                }
                            >
                                <span className="font-medium text-gray-800">
                                    {activity.resume?.title || 'N/A'}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        <ClockCircleOutlined />
                                        Thời gian nộp
                                    </span>
                                }
                            >
                                <span className="text-gray-700">
                                    {new Date(activity.createdAt).toLocaleString('vi-VN', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        Trạng thái
                                    </span>
                                }
                            >
                                {getStatusTag(activity.status)}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        {activity.isSentMail ? (
                                            <CheckCircleOutlined className="text-green-500" />
                                        ) : (
                                            <CloseCircleOutlined className="text-gray-400" />
                                        )}
                                        Trạng thái email
                                    </span>
                                }
                                span={2}
                            >
                                <Tag color={activity.isSentMail ? 'green' : 'default'}>
                                    {activity.isSentMail ? 'Đã gửi email' : 'Chưa gửi email'}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>

                </div>
            )}
        </Modal>
    );
};

export default ViewResumeModal;

