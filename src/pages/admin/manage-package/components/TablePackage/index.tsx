import { Button, Form, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import AddPackageModal from "./components/PackageModal";
import { packageActions } from "../../../../../stores/packageStore/packageReducer";
import type { IUpdatePackage } from "../../../../../types/package/PackageType";

const columns = [
  {
    title: '#',
    key: 'key',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tên gói',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Loại gói',
    dataIndex: ['packageType', 'name'],
    key: 'packageTypeName',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    render: (text: string) => (
      <div style={{ whiteSpace: 'pre-line', wordBreak: 'break-word', maxWidth: 300 }}>
        {text}
      </div>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Button 
          type="primary" 
          icon={<EditOutlined />}
        >
        </Button>
        <Button 
          danger 
          icon={<DeleteOutlined />}
        >
        </Button>
      </Space>
    ),
  },
];

const ListRoleTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { packages, loading, features} = useSelector((state: RootState) => state.packageStore)
  const [isModalOpen, setIsModalOpen] = useState(false)



  useEffect(() => {
    dispatch(packageActions.getAllPackages())
  }, [dispatch])

  const handleFinish = async (values: IUpdatePackage) => {
    dispatch(packageActions.createPackage(values))
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  return (
    <div>

        <Button 
          type="primary" 
          className="mb-4!"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Thêm gói mới
        </Button>


      <Table 
        columns={columns} 
        dataSource={packages}
        loading={loading}
        pagination={false} 
        bordered 
      />

      <AddPackageModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
        form={form}
      />
    </div>
  )
}

export default ListRoleTab; 