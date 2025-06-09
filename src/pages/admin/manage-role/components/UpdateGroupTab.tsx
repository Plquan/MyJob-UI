import { Select, Space, Button, Row, Col, Checkbox } from "antd"
import { useState } from "react";


interface RoleOption {
  value: string;
  label: string;
}

interface RolePermission {
  id: number;
  text: string;
}

const UpdateGroupTab = () => {

    const [roleProfile, setRoleProfile] = useState<string>('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  
    const roleOptions: RoleOption[] = [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ];
  
    const allPermissions: RolePermission[] = [
      { id: 1, text: 'Accounts Manager' },
      { id: 2, text: 'Dashboard Manager' },
      { id: 3, text: 'Knowledge Base Editor' },
      { id: 4, text: 'Newsletter Manager' },
      { id: 5, text: 'Purchase Master Manager' },
      { id: 6, text: 'Sales Manager' },
      { id: 7, text: 'Script Manager' },
      { id: 8, text: 'Website Manager' },
      { id: 9, text: 'Accounts User' },
      { id: 10, text: 'Inbox User' },
      { id: 11, text: 'Maintenance Manager' },
      { id: 12, text: 'Prepared Report User' },
      { id: 13, text: 'Purchase User' },
      { id: 14, text: 'Sales Master Manager' },
      { id: 15, text: 'System Manager' },
      { id: 16, text: 'Blogger' },
      { id: 17, text: 'Knowledge Base Contributor' },
      { id: 18, text: 'Maintenance User' },
      { id: 19, text: 'Purchase Manager' },
      { id: 20, text: 'Report Manager' },
      { id: 21, text: 'Sales User' },
      { id: 22, text: 'Translator' },
    ];
  
  
    const handleRoleSelectChange = (value: string) => {
      setRoleProfile(value);
    };
  
    const handleSelectAll = () => {
      const allPermissionIds = allPermissions.map(p => p.id);
      setSelectedPermissions(allPermissionIds);
    };
  
    const handleUnselectAll = () => {
      setSelectedPermissions([]);
    };
  
    const handlePermissionChange = (permissionId: number) => {
      setSelectedPermissions(prevSelected =>
        prevSelected.includes(permissionId)
          ? prevSelected.filter(id => id !== permissionId)
          : [...prevSelected, permissionId]
      );
    };

    return (
        <>
        <div style={{ marginBottom: 20 }}>
          <h1>Chọn vai trò</h1>
          <Select
            placeholder="Chọn quyền"
            value={roleProfile || undefined} 
            onChange={handleRoleSelectChange}
            options={roleOptions}
            className='w-48!'
          />
        </div>
        <Space style={{ marginBottom: 20 }}>
          <Button onClick={handleSelectAll}>Chọn tất cả</Button>
          <Button onClick={handleUnselectAll}>Bỏ chọn</Button>
        </Space>
        <Row gutter={[16, 16]}>
          {allPermissions.map(permission => (
            <Col span={8} key={permission.id}>
              <Checkbox 
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              >
                {permission.text}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </>
    )
}

export default UpdateGroupTab