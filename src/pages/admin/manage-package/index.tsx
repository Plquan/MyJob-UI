import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TablePackage from './components/TablePackage';
import PaymentHistoryTable from './components/PaymentHistoryTable';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Danh sách',
    children: <TablePackage />,
  },
  {
    key: '2',
    label: 'Thanh toán',
    children: <PaymentHistoryTable />,
  },
]

const PackageManagement = () => (
  <Card title={"Quản lí gói dịch vụ"}>
    <Tabs defaultActiveKey="package-management" items={items} />
  </Card>
)

export default PackageManagement;
