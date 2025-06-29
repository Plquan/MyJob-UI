import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ListRoleTab from './components/TablePackage';
import Setting from './components/SettingPackage';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Danh sách',
    children: <ListRoleTab />,
  },
  {
    key: '2',
    label: 'Thanh toán',
    children: "",
  },
  {
    key: '3',
    label: 'Cài đặt',
    children: <Setting />,
  },
]

const RoleManagement = () => (
  <Card title={"Quản lí gói dịch vụ"}>
    <Tabs defaultActiveKey="role-management" items={items} />
  </Card>
)

export default RoleManagement;
