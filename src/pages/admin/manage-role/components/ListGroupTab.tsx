import { Button, message, Modal, Space, Table } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Package {
    key: string;
    name: string;
    description: string;
  
  }

const ListGroupTab = () => {
  const handleEdit = (record: Package) => {
    Modal.info({
      title: 'Chỉnh sửa gói',
      content: `Bạn có muốn chỉnh sửa gói ${record.name}?`,
      onOk() {
        message.success('Đã mở form chỉnh sửa');
      },
    });
  };

  const handleDelete = (record: Package) => {
    Modal.confirm({
      title: 'Xóa gói',
      content: `Bạn có chắc chắn muốn xóa gói ${record.name}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Xóa thành công');
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      width: 100,
    },
    {
      title: 'Vai trò',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_: any, record: Package) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: Package[] = [
    {
      key: '1',
      name: 'Basic',
      description: '50,000 VNĐ',
    },
  ];

    return (
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
          bordered
          size="middle"
        />
    )
}

export default ListGroupTab