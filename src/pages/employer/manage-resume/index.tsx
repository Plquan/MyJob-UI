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
import useDebounce from '../../../ultils/hooks/useDebounce';
import {
  EyeOutlined,
  DeleteOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { jobPostActivityActions } from '../../../stores/jobPostActivityStore/jobPostActivityReducer';
import type { IJobPostActivityDto } from '../../../types/job-post-activity/JobPostActivity';
import { POSITION_OPTIONS } from '../../../constant/selectOptions';
import { EResumeType } from '../../../enums/resume/EResumeType';
import { EJobPostActivityStatus } from '../../../enums/job-post-activity/EJobPostActivity';
import ViewResumeModal from './components/ViewResumeModal';

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
  const { 
    jobPostActivities, 
    loading, 
    requestParams
  } = useSelector((state: RootState) => state.jobPostActivityStore);
  
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IJobPostActivityDto | null>(null);
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

  // Xem chi tiết
  const handleView = (activity: IJobPostActivityDto) => {
    setSelectedActivity(activity);
    setViewModalVisible(true);
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

  // Gửi email
  const handleSendEmail = (record: IJobPostActivityDto) => {
    if (!record.email) {
      message.warning('Ứng viên chưa có email');
      return;
    }
    // TODO: Implement send email API
    message.success('Đã gửi email thành công');
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
      width: 120,
      align: 'center',
      render: (status) => getStatusTag(status),
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
          <Tooltip title="Gửi email">
            <Button 
              type="text" 
              size="small" 
              icon={<MailOutlined className="text-green-500!" />} 
              onClick={() => handleSendEmail(record)}
              disabled={!record.email || record.isSentMail}
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

      {/* Modal xem chi tiết */}
      <ViewResumeModal
        open={viewModalVisible}
        activity={selectedActivity}
        onClose={() => {
          setViewModalVisible(false);
          setSelectedActivity(null);
        }}
        onSendEmail={handleSendEmail}
        onDelete={handleDelete}
      />
    </Card>
  );
};

export default ManageResumePage;

