import { Button, Form, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { packageActions } from "../../../../../stores/packageStore/packageReducer";
import PackageModal from "./components/PackageModal";
import { PackageColumns } from "./components/PackageColumns";
import type { IPackageDto, ICreatePackagedata, IUpdatePackageData } from "../../../../../types/package/PackageType";

const TablePackage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { allPackages, loading} = useSelector((state: RootState) => state.packageStore)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<IPackageDto | null>(null);

  useEffect(() => {
    dispatch(packageActions.getAllPackages())
  }, [dispatch])

  const handleAdd = () => {
    setEditingPackage(null)
    setIsModalOpen(true)
  }

  const handleEdit = (record: IPackageDto) => {
    setEditingPackage(record)
    form.setFieldsValue({
      ...record
    })
    setIsModalOpen(true)
  }

  const handleFinish = async (data: ICreatePackagedata | IUpdatePackageData) => {
    if (editingPackage) {
      dispatch(packageActions.updatePackage(data as IUpdatePackageData))
    } else {
      dispatch(packageActions.createPackage(data as ICreatePackagedata))
    }
    setIsModalOpen(false)
    form.resetFields()
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
          onClick={handleAdd}
        >
          Thêm gói
        </Button>
      <Table 
        columns={PackageColumns(handleEdit, handleDelete)} 
        dataSource={allPackages}
        loading={loading}
        pagination={false} 
        bordered
        scroll={{ x: 800 }}
        rowKey="id"
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
