import { useState, useEffect } from 'react';
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
import useDebounce from '../../../ultils/hooks/useDebounce';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import EditJobPostModal from './components/EditJobPostModal';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import type { IJobPostData, IGetJobPostsReqParams } from '../../../types/job-post/JobPostType';
import { jobPostActions } from '../../../stores/jobPostStore/jobPostReducer';
import { JOB_POST_STATUS_OPTIONS } from '../../../constant/selectOptions';

const ManageJobPostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    companyJobPost, 
    loading, 
    page, 
    limit, 
    search, 
    totalItems, 
    jobPostStatus 
  } = useSelector((state: RootState) => state.jobPostStore);
  
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState<any>(undefined);
  const debouncedSearch = useDebounce(search, 500);

  const loadJobPosts = () => {
    const params: IGetJobPostsReqParams = {
      page: page,
      limit: limit,
      search: search,
      jobPostStatus: jobPostStatus
    };
    dispatch(jobPostActions.getCompanyJobPosts(params));
  };

  useEffect(() => {
    loadJobPosts();
  }, [dispatch, page, limit, jobPostStatus, debouncedSearch]);

  const showModal = (data?: any) => {
    setEditData(data);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditData(undefined);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    setIsModalVisible(false);
    setEditData(undefined);
    loadJobPosts(); // Reload data after submit
  };


  const getStatusTag = (status: number) => {
    const statusConfig = {
      1: { color: 'orange', text: 'Chờ phê duyệt' },
      2: { color: 'green', text: 'Đã phê duyệt' },
      3: { color: 'red', text: 'Từ chối' },
      4: { color: 'default', text: 'Đã đóng' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: 'Không xác định' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: ColumnsType<IJobPostData> = [
    {
      title: '#',
      key: 'index',
      width: 40,
      align: 'center',
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: 'Tên tin đăng',
      dataIndex: 'jobName',
      key: 'jobName',
      width: 200,
      render: (text) => (
        <div>
          <div className="font-medium">{text}</div>
        </div>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'Không giới hạn',
    },
    {
      title: 'Lượt nộp',
      dataIndex: 'applications',
      key: 'applications',
      width: 80,
      align: 'center',
      render: (count) => <span className="font-medium text-blue-600">{count || 0}</span>,
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 80,
      align: 'center',
      render: (count) => <span className="font-medium text-green-600">{count || 0}</span>,
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
        render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              size="small" 
              icon={<EditOutlined className="text-blue-500!" />} 
              onClick={() => showModal(record)}
            />
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
         <Input
           placeholder="Tìm kiếm theo tên tin đăng hoặc công ty"
           className="w-80!"
           value={search}
           onChange={(e) => dispatch(jobPostActions.setSearch(e.target.value))}
           onClear={() => {
             dispatch(jobPostActions.setSearch(''));
           }}
           allowClear
         />

         <div className="flex items-center gap-2">
           <span className="text-sm font-medium text-gray-600">Trạng thái tuyển dụng:</span>
           <Select
             placeholder="Tất cả"
             className="w-40"
             value={statusFilter}
             onChange={(value) => {
               setStatusFilter(value);
               dispatch(jobPostActions.setPage(1));
               dispatch(jobPostActions.setJobPostStatus(value));
             }}
             allowClear
           >
             {JOB_POST_STATUS_OPTIONS.map(option => (
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
          dataSource={companyJobPost}
          bordered
          loading={loading}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '25'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tin đăng`,
            onChange: (newPage, newSize) => {
              dispatch(jobPostActions.setPage(newPage));
              dispatch(jobPostActions.setLimit(newSize || 10));
            },
            onShowSizeChange: (_, newSize) => {
              dispatch(jobPostActions.setPage(1));
              dispatch(jobPostActions.setLimit(newSize));
            }
          }}
          size="middle"
        />
      </div>

      <EditJobPostModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </Card>
  );
};

export default ManageJobPostPage;
