import { Checkbox, Input, InputNumber, Tooltip } from 'antd';
import type { IFeatureOfPackage } from '../../../../../../types/package/PackageType';
import type { ColumnsType } from 'antd/es/table';

type OnFeatureChange = (featureId: number, field: keyof IFeatureOfPackage, value: any) => void;

const SettingColumns = (onFeatureChange: OnFeatureChange): ColumnsType<IFeatureOfPackage> => [
  {
    title: 'Tính năng',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title:  (
      <Tooltip title="Bật/tắt chức năng">
        Bật
      </Tooltip>
    ),
    dataIndex: 'open',
    key: 'open',
    align: 'center' as const,
    render: (value: boolean, record) => (
      <Checkbox
        checked={value}
        onChange={(e) => onFeatureChange(record.featureId, 'open', e.target.checked)}
      />
    ),
  },
  {
    title: (
      <Tooltip title="Để trống nếu muốn tính năng không giới hạn">
        Giới hạn
      </Tooltip>
    ),
    dataIndex: 'limit',
    key: 'limit',
    align: 'center' as const,
    width: 100,
    render: (value: number, record) => (
      <InputNumber
        value={value}
        min={0}
        disabled={!record.open}
        onChange={(newValue) => onFeatureChange(record.featureId, 'limit', newValue)}
      />
    ),
  },
  {
    title:  (
      <Tooltip title="Mô tả tính năng của gói">
        Mô tả
      </Tooltip>
    ),
    dataIndex: 'description',
    key: 'description',
    render: (value: string, record) => (
      <Input.TextArea
        value={value}
        disabled={!record.open}
        placeholder="Nhập mô tả..."
        autoSize={{ minRows: 1, maxRows: 4 }}
        onChange={(e) => onFeatureChange(record.featureId, 'description', e.target.value)}
      />
    ),
  },
]

export default SettingColumns