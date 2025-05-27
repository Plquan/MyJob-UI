import { useState } from 'react';
import { Input, Button, Checkbox, Row, Col } from 'antd';

const roles = [
  'Accounts Manager',
  'Dashboard Manager',
  'Knowledge Base Editor',
  'Newsletter Manager',
  'Purchase Master Manager',
  'Sales Manager',
  'Script Manager',
  'Website Manager',
  'Accounts User',
  'Inbox User',
  'Maintenance Manager',
  'Prepared Report User',
  'Purchase User',
  'Sales Master Manager',
  'System Manager',
  'Blogger',
  'Knowledge Base Contributor',
  'Maintenance User',
  'Purchase Manager',
  'Report Manager',
  'Sales User',
  'Translator',
];

const ManageRolePage = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectedRoles(roles);
  };

  const handleUnselectAll = () => {
    setSelectedRoles([]);
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setSelectedRoles(prevSelectedRoles =>
      checked
        ? [...prevSelectedRoles, role]
        : prevSelectedRoles.filter(item => item !== role)
    );
  };

  const rolesPerColumn = Math.ceil(roles.length / 3);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>
      <div className="mb-4">
        <label htmlFor="roleProfile" className="block text-sm font-medium text-gray-700">Role Profile</label>
        <Input id="roleProfile" className="mt-1 block w-full md:w-1/2 lg:w-1/3" placeholder="Enter role profile" />
      </div>
      
      <div className="mb-4">
        <Button onClick={handleSelectAll} className="mr-2">Select All</Button>
        <Button onClick={handleUnselectAll}>Unselect All</Button>
      </div>

      <Row gutter={[16, 16]}>
        {[0, 1, 2].map(colIndex => (
          <Col key={colIndex} xs={24} md={8}>
            {
              roles.slice(colIndex * rolesPerColumn, (colIndex + 1) * rolesPerColumn).map(role => (
                <div key={role} className="mb-2">
                  <Checkbox
                    checked={selectedRoles.includes(role)}
                    onChange={e => handleRoleChange(role, e.target.checked)}
                  >
                    {role}
                  </Checkbox>
                </div>
              ))
            }
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageRolePage;
