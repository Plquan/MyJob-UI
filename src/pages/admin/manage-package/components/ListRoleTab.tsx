import { Table } from "antd";

const ListRoleTab = () => {
    interface RoleData {
        key: string;
        roleName: string;
        permissions: string[];
      }
      
      const roleData: RoleData[] = [
        {
          key: '1',
          roleName: 'Quản trị viên',
          permissions: [
            'Quản lý người dùng',
            'Phân quyền',
            'Xem báo cáo',
            'Truy cập API',
          ],
        },
        {
          key: '2',
          roleName: 'Nhà tuyển dụng',
          permissions: [
            'Tìm kiếm ứng viên',
            'Xem hồ sơ',
            'Đăng tin tuyển dụng',
            'Mời phỏng vấn',
          ],
        },
        {
          key: '3',
          roleName: 'Người dùng',
          permissions: [
            'Cập nhật hồ sơ',
            'Xem tin tuyển dụng',
            'Ứng tuyển công việc',
          ],
        },
      ];
      
      const columns = [
        {
          title: '#',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Tên vai trò',
          dataIndex: 'roleName',
          key: 'roleName',
        },
        {
          title: 'Quyền',
          dataIndex: 'permissions',
          key: 'permissions',
          render: (permissions: string[]) => (
            <>
              {permissions.map((permission, index) => (
                <div key={index}>• {permission}</div>
              ))}
            </>
          ),
        },
      ];

      return (
        <Table columns={columns} dataSource={roleData} pagination={false} />
      )

}

export default ListRoleTab;