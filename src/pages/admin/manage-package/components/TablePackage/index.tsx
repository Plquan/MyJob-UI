import { Button, Form, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { packageActions } from "../../../../../stores/packageStore/packageReducer";
import PackageModal from "./components/PackageModal";
import { PackageColumns } from "./components/PackageColumns";
import type { IPackage } from "../../../../../types/package/PackageType";

const TablePackage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { packages, loading} = useSelector((state: RootState) => state.packageStore)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<IPackage | null>(null);

  useEffect(() => {
    dispatch(packageActions.getAllPackages())
  }, [dispatch])

  const handleAdd = () => {
    setEditingPackage(null)
    setIsModalOpen(true)
  }

  const handleEdit = (record: IPackage) => {
    setEditingPackage(record)
    console.log(record)
    form.setFieldsValue({
      ...record
    })
    setIsModalOpen(true)
  }

  const handleFinish = async (data: IPackage) => {
    console.log(data)
    if (editingPackage) {
      dispatch(packageActions.updatePackage(data))
    } else {
      dispatch(packageActions.createPackage(data))
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleDelete = (packageId: number) => {
    if (!packageId) return;
    dispatch(packageActions.deletePackage(packageId))
  }

  return (
    <div>

        <Button 
          type="primary" 
          className="mb-4!"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm gói
        </Button>


      <Table 
        columns={PackageColumns(handleEdit, handleDelete)} 
        dataSource={packages}
        loading={loading}
        pagination={false} 
        bordered 
      />

      <PackageModal
        open={isModalOpen}
        onCancel={handleCancel}
        onFinish={handleFinish}
        form={form}
        isEdit={!!editingPackage}
      />
    </div>
  )
}

export default TablePackage; 
