import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TablePackage from './components/TablePackage';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Danh sách',
    children: <TablePackage />,
  },
  {
    key: '2',
    label: 'Thanh toán',
    children: "",
  },
]

const RoleManagement = () => (
  <Card title={"Quản lí gói dịch vụ"}>
    <Tabs defaultActiveKey="role-management" items={items} />
  </Card>
)

export default RoleManagement;
