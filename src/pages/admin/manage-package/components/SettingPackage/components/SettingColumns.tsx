import { Checkbox, Input, InputNumber, Tooltip } from 'antd';
import type { IPackageFeature } from '../../../../../../types/package/PackageType';
import type { ColumnsType } from 'antd/es/table';

type OnFeatureChange = (featureId: number, field: keyof IPackageFeature, value: any) => void;

const SettingColumns = (onFeatureChange: OnFeatureChange): ColumnsType<IPackageFeature> => [
  {
    title: 'Tính năng',
    dataIndex: 'name',
    key: 'name',
    width: 150,
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
    width: 60,
    render: (value: boolean, record) => (
      <Checkbox
        checked={value}
        onChange={(e) => onFeatureChange(record.featureId, 'open', e.target.checked)}
      />
    ),
  },
  {
    title: (
      <Tooltip title="Bật/tắt tính năng không giới hạn">
       Không giới hạn
      </Tooltip>
    ),
    dataIndex: 'unlimited',
    key: 'unlimited',
    align: 'center' as const,
    width: 90,
    render: (value: boolean, record) => (
      <Checkbox
        checked={value}
        disabled={!record.open}
        onChange={(e) => onFeatureChange(record.featureId, 'unlimited', e.target.checked)}
      />
    ),
  },
  {
    title: (
      <Tooltip title="Hạn mức số lượng hoặc ngày hết hạn tính năng">
        Hạn mức
      </Tooltip>
    ),
    dataIndex: 'quota',
    key: 'quota',
    align: 'center' as const,
    width: 80,
    render: (value: number, record) => {
      const showError = record.open && !record.unlimited && (value === undefined || value === null || isNaN(value) || Number(value) <= 0);
      return (
        <div>
          <InputNumber
            value={value}
            min={1}
            disabled={!record.open || record.unlimited}
            status={showError ? 'error' : undefined}
            onChange={(newValue) => onFeatureChange(record.featureId, 'quota', newValue)}
          />
          {showError && (
            <div style={{ color: 'red', fontSize: 12 }}>Hạn mức phải lớn hơn 0</div>
          )}
        </div>
      );
    },
  },
  {
    title:  (
      <Tooltip title="Mô tả tính năng của gói">
        Mô tả
      </Tooltip>
    ),
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (value: string, record) => {
      const showError = record.open && (!value || value.trim() === '');
      return (
        <div>
          <Input.TextArea
            value={value}
            disabled={!record.open}
            placeholder="Nhập mô tả..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            status={showError ? 'error' : undefined}
            onChange={(e) => onFeatureChange(record.featureId, 'description', e.target.value)}
          />
          {showError && (
            <div style={{ color: 'red', fontSize: 12 }}>Vui lòng nhập mô tả</div>
          )}
        </div>
      );
    },
  },
]

export default SettingColumns