import { Button, message, Modal, Space, Table } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { IRoleData } from "../../../../../types/role/RoleType";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { roleActions } from "../../../../../stores/roleStore/roleReducer";
import AddRoleModal from "../Modal/AddRoleModal";
import EditRoleModal from "../Modal/EditRoleModal";
import { userActions } from "../../../../../stores/userStore/userReducer";




interface DataType extends IRoleData {
    key: React.Key;
}
  
const ListGroupTab = () => {
    const [data, setData] = useState<DataType[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { roles,loading } = useSelector((state: RootState) => state.roleStore);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<DataType | null>(null);
    

  const handleDelete = (record: DataType) => {
    Modal.confirm({
      title: 'Xóa vai trò',
      content: `Bạn có chắc chắn muốn xóa vai trò ${record.name}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      onOk() {
        dispatch(roleActions.deleteRole(record.id))
      },
    });
  };

  const columns:ColumnsType<DataType>  = [
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
      width: 350,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 50,
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedRole(record);
              setIsEditModalOpen(true);
            }}
            
          >
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(roleActions.getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    if (roles) {
      setData(
        roles.map((item, index) => ({
          ...item,
          key: index + 1,
        }))
      );
    }
  }, [roles]);

    return (
        <>
        <Button type="primary" className="mb-4!" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
        <Table 
          columns={columns} 
          loading={loading}
          dataSource={data} 
          pagination={false}
          bordered
          size="middle"
        />
        <AddRoleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <EditRoleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRole(null);
          }}
          roleData={selectedRole}
        />
        </>

    )
}

export default ListGroupTab