import { Tabs, Card } from 'antd'


import ListGroupTab from './components/ListGroupTab'
import PermissionGroupTab from './components/PermissionGroupTab'


const ManageRolePage = () => {

  const items = [
    {
      key: '1',
      label: 'Danh sách nhóm quyền',
      children: (
        <ListGroupTab/>
      )
    },
    {
      key: '2',
      label: 'Cập nhật quyền',
      children: (
       <PermissionGroupTab/>
      )
    }
  ]

  return (
    <Card title="Quản lí quyền hạn">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  )
}
export default ManageRolePage;
