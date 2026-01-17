import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TableJobPost from './components/TableJobPost';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Danh sách',
        children: <TableJobPost />,
    },
]

const JobPostManagement = () => (
    <Card title={"Quản lí tin tuyển dụng"}>
        <Tabs defaultActiveKey="1" items={items} />
    </Card>
)

export default JobPostManagement;
