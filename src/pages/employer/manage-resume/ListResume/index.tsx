import { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Select,
  Table,
  Button,
  Space,
  Tag,
  Tooltip,
  Modal,
  message
} from 'antd';
import useDebounce from '../../../../ultils/hooks/useDebounce';
import {
  EyeOutlined,
  DeleteOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../../stores';
import { jobPostActivityActions } from '../../../../stores/jobPostActivityStore/jobPostActivityReducer';
import type { IJobPostActivityDto } from '../../../../types/job-post-activity/JobPostActivity';
import { POSITION_OPTIONS } from '../../../../constant/selectOptions';
import { EResumeType } from '../../../../enums/resume/EResumeType';
import { EJobPostActivityStatus } from '../../../../enums/job-post-activity/EJobPostActivity';
import SendEmailModal from '../../../../components/employer/SendEmailModal';
import ROUTE_PATH from '../../../../routes/routePath';

// Status options cho job activity
const JOB_ACTIVITY_STATUS_OPTIONS = [
  { value: EJobPostActivityStatus.PENDING, label: "Chờ xử lý" },
  { value: EJobPostActivityStatus.CONTACTED, label: "Đã liên hệ" },
  { value: EJobPostActivityStatus.TESTED, label: "Đã test" },
  { value: EJobPostActivityStatus.INTERVIEWED, label: "Đã phỏng vấn" },
  { value: EJobPostActivityStatus.ACCEPTED, label: "Đã chấp nhận" },
  { value: EJobPostActivityStatus.REJECTED, label: "Đã từ chối" },
];

const ManageResumePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    jobPostActivities,
    loading,
    requestParams
  } = useSelector((state: RootState) => state.jobPostActivityStore);

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [selectedEmailActivity, setSelectedEmailActivity] = useState<IJobPostActivityDto | null>(null);
  const debouncedSearch = useDebounce(requestParams.search || '', 500);


  useEffect(() => {
    dispatch(jobPostActivityActions.getJobPostActivities({
      ...requestParams,
      search: debouncedSearch || undefined
    }));
  }, [dispatch, requestParams.page, requestParams.limit, requestParams.status, debouncedSearch]);

  // Lấy label position
  const getPositionLabel = (position?: number) => {
    if (!position) return 'N/A';
    return POSITION_OPTIONS.find(opt => opt.value === position)?.label || 'N/A';
  };

  // Xem chi tiết
  const handleView = (activity: IJobPostActivityDto) => {
    if (!activity.resumeId) {
      message.warning('Hồ sơ này chưa có thông tin CV');
      return;
    }
    navigate(ROUTE_PATH.EMPLOYER_RESUME_DETAIL.replace(':resumeId', activity.resumeId.toString()));
  };

  // Xóa
  const handleDelete = (_record: IJobPostActivityDto) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa hồ sơ ứng tuyển này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        dispatch(jobPostActivityActions.deleteJobPostActivity(_record.id));
      },
    });
  };

  // Gửi email - mở modal
  const handleSendEmail = (record: IJobPostActivityDto) => {
    if (!record.email) {
      message.warning('Ứng viên chưa có email');
      return;
    }
    setSelectedEmailActivity(record);
    setEmailModalVisible(true);
  };

  // Xử lý khi gửi email từ modal
  const handleEmailSend = async (values: { to: string; subject: string; content: string }) => {
    if (selectedEmailActivity) {
      try {
        await dispatch(jobPostActivityActions.sendEmailToCandidate({
          jobPostActivityId: selectedEmailActivity.id,
          ...values
        })).unwrap();
        setEmailModalVisible(false);
        setSelectedEmailActivity(null);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  };

  // Đóng modal email
  const handleEmailModalCancel = () => {
    setEmailModalVisible(false);
    setSelectedEmailActivity(null);
  };

  // Cập nhật trạng thái
  const handleStatusChange = async (newStatus: number, record: IJobPostActivityDto) => {
    Modal.confirm({
      title: 'Xác nhận cập nhật',
      content: 'Bạn có muốn cập nhật trạng thái hồ sơ ứng tuyển?',
      okText: 'OK',
      cancelText: 'Hủy',
      centered: true,
      onOk: async () => {
        try {
          const jobPostActivityService = (await import('../../../../services/jobPostActivityService')).default;
          const result = await jobPostActivityService.updateJobPostActivityStatus({
            jobPostActivityId: record.id,
            status: newStatus as EJobPostActivityStatus
          });

          if (result) {
            message.success('Cập nhật trạng thái thành công');
            dispatch(jobPostActivityActions.getJobPostActivities({
              ...requestParams,
              search: debouncedSearch || undefined
            }));
          } else {
            message.error('Cập nhật trạng thái thất bại');
          }
        } catch (error) {
          console.error('Error updating status:', error);
          message.error('Có lỗi xảy ra khi cập nhật trạng thái');
        }
      },
    });
  };

  const columns: ColumnsType<IJobPostActivityDto> = [
    {
      title: '#',
      key: 'index',
      width: 50,
      align: 'center',
      render: (_, __, index) => (requestParams.page - 1) * requestParams.limit + index + 1,
    },
    {
      title: 'Tên hồ sơ',
      key: 'resumeName',
      width: 200,
      render: (_, record) => (
        <div className="font-medium">{record.resume?.title || 'N/A'}</div>
      ),
    },
    {
      title: 'Vị trí',
      key: 'position',
      width: 200,
      render: (_, record) => (
        <div>{getPositionLabel(record.resume?.position)}</div>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      align: 'center',
      render: (date) => new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    {
      title: 'Loại hồ sơ',
      key: 'resumeType',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Tag color={record.resume?.type === EResumeType.ONLINE ? 'blue' : 'purple'}>
          {record.resume?.type === EResumeType.ONLINE ? 'CV Online' : 'CV Đính kèm'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      align: 'center',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(newStatus, record)}
          className="w-full"
          options={JOB_ACTIVITY_STATUS_OPTIONS}
        />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'isSentMail',
      key: 'isSentMail',
      width: 100,
      align: 'center',
      render: (isSentMail: boolean) => (
        <Tag color={isSentMail ? 'green' : 'default'}>
          {isSentMail ? 'Đã gửi' : 'Chưa gửi'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined className="text-blue-500!" />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title={record.isSentMail ? "Gửi lại email" : "Gửi email"}>
            <Button
              type="text"
              size="small"
              icon={<MailOutlined className="text-green-500!" />}
              onClick={() => handleSendEmail(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý hồ sơ ứng tuyển">
      <div className="mb-4 mt-4 flex gap-4 items-center flex-wrap">
        <Input
          placeholder="Tìm kiếm theo tên vị trí"
          className="w-80!"
          value={requestParams.search || ''}
          onChange={(e) => dispatch(jobPostActivityActions.setSearch(e.target.value || undefined))}
          onClear={() => {
            dispatch(jobPostActivityActions.setSearch(undefined));
          }}
          allowClear
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Trạng thái:</span>
          <Select
            placeholder="Tất cả"
            className="w-40"
            value={requestParams.status}
            onChange={(value) => {
              dispatch(jobPostActivityActions.setStatus(value));
            }}
            allowClear
          >
            {JOB_ACTIVITY_STATUS_OPTIONS.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={jobPostActivities.items}
          bordered
          loading={loading}
          scroll={{ x: 1000 }}
          pagination={{
            current: requestParams.page,
            pageSize: requestParams.limit,
            total: jobPostActivities.totalItems,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '25'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} hồ sơ`,
            onChange: (newPage, newSize) => {
              dispatch(jobPostActivityActions.setPage(newPage));
              dispatch(jobPostActivityActions.setLimit(newSize || 10));
            },
            onShowSizeChange: (_, newSize) => {
              dispatch(jobPostActivityActions.setPage(1));
              dispatch(jobPostActivityActions.setLimit(newSize));
            }
          }}
          size="middle"
        />
      </div>

      {/* Modal gửi email */}
      <SendEmailModal
        open={emailModalVisible}
        toEmail={selectedEmailActivity?.email || ''}
        onCancel={handleEmailModalCancel}
        onSend={handleEmailSend}
      />
    </Card>
  );
};

export default ManageResumePage;

