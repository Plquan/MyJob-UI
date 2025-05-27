import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Setting from './components/SettingTab';
import ListRoleTab from './components/ListRoleTab';


const items: TabsProps['items'] = [
  {
    key: 'role-management',
    label: 'Danh sách',
    children: <ListRoleTab />,
  },
  {
    key: 'other',
    label: 'Cài đặt',
    children: <Setting />,
  },
];

const RoleManagement = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Quản lý truy cập</h1>
    <Tabs defaultActiveKey="role-management" items={items} />
  </div>
)

export default RoleManagement;
