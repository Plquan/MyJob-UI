import React from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';

interface Package {
  key: string;
  name: string;
  price: string;
  duration: string;
}

interface Permission {
  key: string;
  name: string;
  checked: boolean;
}

interface PermissionModalProps {
  isVisible: boolean;
  selectedPackage: Package | null;
  permissions: Permission[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onPermissionChange: (key: string, checked: boolean) => void;
  onOk: () => void;
  onCancel: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  isVisible,
  selectedPackage,
  permissions,
  searchTerm,
  onSearchChange,
  onPermissionChange,
  onOk,
  onCancel,
}) => {
  const filteredPermissions = permissions.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      title={`Quản lý quyền cho gói: ${selectedPackage?.name}`}
      open={isVisible}
      footer={null}
      onCancel={onCancel}
      width={350}
    >
      <p>Chọn quyền cho vai trò này:</p>

      <Input.Search
        placeholder="Tìm quyền..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mb-2"
        allowClear
      />

      <div className="max-h-[300px] overflow-y-auto pr-1">
        {filteredPermissions.map(permission => (
          <div
            key={permission.key}
            className="mb-1 bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => onPermissionChange(permission.key, !permission.checked)}
          >
            <Checkbox
              checked={permission.checked}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                onPermissionChange(permission.key, e.target.checked)
              }
            >
              {permission.name}
            </Checkbox>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button onClick={onCancel}>Hủy</Button>
        <Button type="primary" onClick={onOk}>Lưu</Button>
      </div>
    </Modal>
  );
};

export default PermissionModal; 