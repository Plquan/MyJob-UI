import { Tabs, Card } from 'antd'

import UpdateGroupTab from './components/UpdateGroupTab'
import ListGroupTab from './components/ListGroupTab'


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
       <UpdateGroupTab/>
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
