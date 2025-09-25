import { useState } from 'react';
import { 
  Card, 
  Input, 
  Select, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Tooltip
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateJobPostModal from './components/CreateJobPostModal';

// Dữ liệu mẫu
const mockJobPosts = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    companyName: 'TechCorp Vietnam',
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    applicationCount: 45,
    viewCount: 320,
    status: 'ACTIVE',
    approvalStatus: 'APPROVED',
    jobType: 'FULL_TIME',
    experienceLevel: 'SENIOR',
    location: 'Hồ Chí Minh',
    salary: { min: 20000000, max: 35000000, currency: 'VND' },
    isUrgent: true,
    isRemote: true
  },
  {
    id: '2',
    title: 'Backend Developer (Node.js)',
    companyName: 'StartupXYZ',
    postedDate: '2024-01-14',
    deadline: '2024-02-10',
    applicationCount: 28,
    viewCount: 180,
    status: 'ACTIVE',
    approvalStatus: 'PENDING',
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    location: 'Hà Nội',
    salary: { min: 15000000, max: 25000000, currency: 'VND' },
    isUrgent: false,
    isRemote: false
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    companyName: 'Design Studio',
    postedDate: '2024-01-12',
    deadline: '2024-02-05',
    applicationCount: 67,
    viewCount: 450,
    status: 'ACTIVE',
    approvalStatus: 'APPROVED',
    jobType: 'FULL_TIME',
    experienceLevel: 'JUNIOR',
    location: 'Đà Nẵng',
    salary: { min: 12000000, max: 20000000, currency: 'VND' },
    isUrgent: false,
    isRemote: true
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    companyName: 'CloudTech',
    postedDate: '2024-01-10',
    deadline: '2024-01-30',
    applicationCount: 12,
    viewCount: 95,
    status: 'EXPIRED',
    approvalStatus: 'APPROVED',
    jobType: 'CONTRACT',
    experienceLevel: 'SENIOR',
    location: 'Hồ Chí Minh',
    salary: { min: 25000000, max: 40000000, currency: 'VND' },
    isUrgent: true,
    isRemote: true
  },
  {
    id: '5',
    title: 'Marketing Intern',
    companyName: 'Growth Agency',
    postedDate: '2024-01-08',
    deadline: '2024-02-20',
    applicationCount: 89,
    viewCount: 520,
    status: 'ACTIVE',
    approvalStatus: 'REJECTED',
    jobType: 'INTERNSHIP',
    experienceLevel: 'ENTRY',
    location: 'Hà Nội',
    salary: { min: 5000000, max: 8000000, currency: 'VND' },
    isUrgent: false,
    isRemote: false
  }
];

const ManageJobPostPage = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [approvalFilter, setApprovalFilter] = useState<string | undefined>(undefined);
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // Xử lý submit form ở đây
    setIsModalVisible(false);
  };

  // Lọc dữ liệu
  const filteredData = mockJobPosts.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesApproval = !approvalFilter || job.approvalStatus === approvalFilter;

    return matchesSearch && matchesStatus && matchesApproval;
  });

  // Định dạng trạng thái
  const getStatusTag = (status: string) => {
    const statusConfig = {
      'ACTIVE': { color: 'green', text: 'Đang hoạt động' },
      'INACTIVE': { color: 'default', text: 'Tạm dừng' },
      'EXPIRED': { color: 'red', text: 'Hết hạn' },
      'DRAFT': { color: 'orange', text: 'Bản nháp' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };


  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 40,
      align: 'center',
    },
    {
      title: 'Tên tin đăng',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.companyName}</div>
        </div>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'postedDate',
      key: 'postedDate',
      align: 'center',
      width: 100,
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thời hạn nộp',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'center',
      width: 100,
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Lượt nộp',
      dataIndex: 'applicationCount',
      key: 'applicationCount',
      width: 80,
      align: 'center',
      render: (count) => <span className="font-medium text-blue-600">{count}</span>,
    },
    {
      title: 'Lượt xem',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 80,
      align: 'center',
      render: (count) => <span className="font-medium text-green-600">{count}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center',
        render: () => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button type="text" size="small" icon={<EditOutlined className="text-blue-500!" />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Quản lý tin tuyển dụng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Tạo tin mới</Button>}>
      <div className="mb-4 mt-4 flex gap-4 items-center">
        <Input.Search
          placeholder="Tìm kiếm theo tên tin đăng hoặc công ty"
          className="w-80!"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Trạng thái tuyển dụng:</span>
          <Select
            placeholder="Tất cả"
            className="w-40"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
          >
            <Select.Option value="ACTIVE">Đang hoạt động</Select.Option>
            <Select.Option value="INACTIVE">Tạm dừng</Select.Option>
            <Select.Option value="EXPIRED">Hết hạn</Select.Option>
            <Select.Option value="DRAFT">Bản nháp</Select.Option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Trạng thái duyệt:</span>
          <Select
            placeholder="Tất cả"
            className="w-40"
            value={approvalFilter}
            onChange={setApprovalFilter}
            allowClear
          >
            <Select.Option value="PENDING">Chờ duyệt</Select.Option>
            <Select.Option value="APPROVED">Đã duyệt</Select.Option>
            <Select.Option value="REJECTED">Từ chối</Select.Option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData.map((item, index) => ({ ...item, key: index + 1 }))}
          bordered
          pagination={{
            current: 1,
            pageSize: 10,
            total: filteredData.length,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '25'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tin đăng`,
          }}
          size="middle"
        />
      </div>

      {/* Modal tạo tin mới */}
      <CreateJobPostModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default ManageJobPostPage;
