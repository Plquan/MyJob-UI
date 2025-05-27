import React from 'react';
import { Tabs, Button, Table, Pagination, Space } from 'antd'
import PermissionModal from './PermissionModal';

const { TabPane } = Tabs;

interface Package {
  key: string;
  name: string;
  price: string;
  duration: string;
}

interface Permission {
  key: string;
  name: string;
  checked: boolean;
}

const Setting: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [permissions, setPermissions] = React.useState<Permission[]>([
    { key: 'read', name: 'Read', checked: false },
    { key: 'write', name: 'Write', checked: false },
    { key: 'delete', name: 'Delete', checked: false },
    { key: 'manageUsers', name: 'Manage Users', checked: false },
  ]);
  const [selectedPackage, setSelectedPackage] = React.useState<Package | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const onChange = (key: string) => {
    console.log(key);
  };

  const showModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setPermissions(permissions.map(p => ({ ...p, checked: false })));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('Selected permissions:', permissions.filter(p => p.checked));
    setIsModalVisible(false);
    setSelectedPackage(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPackage(null);
  };

  const handlePermissionChange = (key: string, checked: boolean) => {
    setPermissions(permissions.map(p =>
      p.key === key ? { ...p, checked } : p
    ));
  };

  const columns = [
    {
      title: 'Tên gói',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Package) => (
        <Space size="middle">
          <Button type="primary" size="small">Sửa</Button>
          <Button size="small" onClick={() => showModal(record)}>Quản lý quyền</Button>
          <Button type="primary" danger size="small">Xóa</Button>
        </Space>
      ),
    },
  ];

  const data: Package[] = [
    {
      key: '1',
      name: 'Basic',
      price: '50,000 VNĐ',
      duration: '30 tháng',
    },
    {
      key: '2',
      name: 'Premium',
      price: '2,000,000 VNĐ',
      duration: '30 tháng',
    },
    {
      key: '3',
      name: 'Enterprise',
      price: '5,000,000 VNĐ',
      duration: '30 tháng',
    },
  ];

  return (
    <div className="p-4 border-1 border-gray-200 rounded-lg">
      <h1 className="font-bold mb-4">Cài đặt vai trò và quyền</h1>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Gói dịch vụ" key="1">
          <div className="mb-4">
            <Button type="primary">Tạo vài trò mới</Button>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />
          <div className="mt-4 flex justify-end">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </TabPane>
        <TabPane tab="Quyền" key="2">
          <p>Content for Quyền tab</p>
        </TabPane>
      </Tabs>

      <PermissionModal
        isVisible={isModalVisible}
        selectedPackage={selectedPackage}
        permissions={permissions}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onPermissionChange={handlePermissionChange}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Setting;
