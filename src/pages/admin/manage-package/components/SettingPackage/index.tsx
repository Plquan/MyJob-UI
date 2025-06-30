import React, { useEffect } from 'react';
import { Table, Select, Card, Space, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../stores'
import  { packageActions } from '../../../../../stores/packageStore/packageReducer'
import SettingColumns from './components/SettingColumns';
import type { IFeatureOfPackage } from '../../../../../types/package/PackageType';
import ReloadOutlined from '@ant-design/icons/lib/icons/ReloadOutlined';



const Setting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { featuresOfPackage, packages, loading} = useSelector((state: RootState) => state.packageStore)
  const [selectedPackageId, setSelectedPackageId] = React.useState<number | null>(null)
  const [features, setFeatures] = React.useState<IFeatureOfPackage[]>([])

  useEffect(() => {
    setFeatures(featuresOfPackage)
  }, [featuresOfPackage])

  const handleSelectPackage = (packageId: number | undefined) => {
    if (packageId) {
      setSelectedPackageId(packageId)
      dispatch(packageActions.getFeaturesOfPackage(packageId))
    } else {
      setSelectedPackageId(null)
      setFeatures([])
    }
  }

  const handleFeatureChange = (featureId: number, field: keyof IFeatureOfPackage, value: any) => {
    setFeatures(prev => prev.map(feature => {
      if (feature.featureId === featureId) {
        const updatedFeature = { ...feature, [field]: value }
        if (field === 'open' && value === false) {
          updatedFeature.limit = undefined
          updatedFeature.description = ''
        }

        return updatedFeature
      }
      return feature
    }))
  }

  const handleSave = () => {
    if (!selectedPackageId) {
      message.warning('Vui lòng chọn gói trước khi lưu')
      return
    }
    const enabledFeatures = features.filter(feature => feature.open === true)
    dispatch(packageActions.updatePackageFeatures({ data: enabledFeatures, packageId: selectedPackageId }))
  }

  const columns = SettingColumns(handleFeatureChange)

  return (
    <Card title={'Cập nhật tính năng cho gói'}
      extra={
        <Space>
          <Select
            placeholder="Chọn gói"
            className='w-48!'
            options={packages.map(pkg => ({ label: pkg.name, value: pkg.id }))}
            onChange={handleSelectPackage}
            allowClear
            loading={loading}
          />
          <Button
            onClick={() => setFeatures(featuresOfPackage)}
            title="Tải lại dữ liệu ban đầu"
            icon={<ReloadOutlined />}
            loading={loading}
          >
          </Button>
          <Button type="primary" loading={loading} onClick={handleSave}>Cập nhật</Button>
        </Space>
      }
    >
      <Table
        bordered
        columns={columns}
        dataSource={features}
        rowKey="featureId"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default Setting;
