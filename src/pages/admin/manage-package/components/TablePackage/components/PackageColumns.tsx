import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, CheckCircleFilled, StopOutlined } from '@ant-design/icons';
import { formatVND } from '../../../../../../ultils/functions/formatVND';
import type { IPackageDto } from '../../../../../../types/package/PackageType';

export const PackageColumns = (handleEdit: (record: IPackageDto) => void, handleDelete?: (packageId: number) => void) => [
  {
    title: 'STT',
    key: 'index',
    width: 80,
    align: 'center' as const,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tên gói',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (price: number) => formatVND(price),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    render: (description: string) => description,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 120,
    align: 'center' as const,
    render: (isActive: boolean) =>
      isActive ? (
        <CheckCircleFilled style={{ color: '#3CB371', fontSize: '16px' }} />
      ) : (
        <StopOutlined  style={{ color: '#B22222', fontSize: '14px' }} />
      ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    render: (_: any, record: IPackageDto) => (
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