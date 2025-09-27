import { Button, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatVND } from '../../../../../../ultils/functions/formatVND';

export const PackageColumns = (handleEdit: (record: any) => void, handleDelete?: (packageId: number) => void) => [
  {
    title: '#',
    key: 'key',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tên gói',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá (VND)',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => formatVND(price),
  },
  {
    title: 'Thời hạn (ngày)',
    dataIndex: 'durationInDays',
    key: 'durationInDays',
    render: (days: number) => days ? `${days} ngày` : 'Không giới hạn',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? 'Hoạt động' : 'Không hoạt động'}
      </Tag>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
        <Button 
          danger 
          icon={<DeleteOutlined />}
          onClick={handleDelete ? () => handleDelete(record.id) : undefined}
        />
      </Space>
    ),
  },
]; 