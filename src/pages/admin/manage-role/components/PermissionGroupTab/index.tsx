import { Select, Space, Button, Row, Col, Checkbox, message } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../stores";
import { roleActions } from "../../../../../stores/roleStore/roleReducer";
import type { IUpdateRolePermission } from "../../../../../types/role/RoleType";
import LoadingLayout from "../../../../../components/LoadingLayout";


const PermissionGroupTab = () => {
  const dispatch = useDispatch<AppDispatch>()
    const [roleID, setRoleID] = useState<number>()
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    const { functions,roles,loading } = useSelector((state: RootState) => state.roleStore)
  
    
    const uniqueFunctions = functions?.filter((func, index, self) =>
      index === self.findIndex((f) => f.name === func.name)
    );
  
    const handleRoleSelectChange = (value: number) => {
      setRoleID(value);
      const selectedRole = roles?.find(role => role.id === value);
      setSelectedPermissions(selectedRole?.functionId || []);
    };
  
    const handleSelectAll = () => {
      if (!roleID) {
        message.error('Vui lòng chọn vai trò trước');
        return;
      }
      const allPermissionIds = uniqueFunctions!.map(p => p.id);
      setSelectedPermissions(allPermissionIds);
    };
  
    const handleUnselectAll = () => {
      if (!roleID) {
        message.error('Vui lòng chọn vai trò trước');
        return;
      }
      setSelectedPermissions([]);
    };
  
    const handlePermissionChange = (permissionId: number) => {
      if (!roleID) {
        message.error('Vui lòng chọn vai trò trước');
        return;
      }
      setSelectedPermissions(prevSelected =>
        prevSelected.includes(permissionId)
          ? prevSelected.filter(id => id !== permissionId)
          : [...prevSelected, permissionId]
      );
    };

    const handleUpdate = () => {
      if (!roleID) {
        message.error('Vui lòng chọn vai trò trước');
        return;
      }
      const updateRoleData: IUpdateRolePermission = {
        roleId: roleID,
        functionIds: selectedPermissions
      }

      dispatch(roleActions.updateRolePermissions(updateRoleData))   
    }

    useEffect(() => {
      if(!roles){
        dispatch(roleActions.getAllRoles())
      }
      dispatch(roleActions.getAllFunctions())
    }, [dispatch]);
  

    return (
        <>
        <LoadingLayout loading={loading}/>
        <div style={{ marginBottom: 20 }}>
        <span className="text-sm font-medium text-gray-600 mr-2">Vai trò:</span>
          <Select
              placeholder="Chọn quyền"
              value={roleID || undefined} 
              onChange={handleRoleSelectChange}
              options={roles?.map(role => ({
                label: role.name,
                value: role.id
              }))}
              className='w-48!'
            />
        </div>
        {roleID && (
          <>
            <Space style={{ marginBottom: 20 }}>
              <Button onClick={handleSelectAll}>Chọn tất cả</Button>
              <Button onClick={handleUnselectAll}>Bỏ chọn</Button>
              <Button type="primary" onClick={handleUpdate}>Cập nhật</Button>
            </Space>
            <Row gutter={[16, 16]}>
              {uniqueFunctions?.map(func => (
                <Col span={8} key={func.id}>
                  <Checkbox 
                    checked={selectedPermissions.includes(func.id)}
                    onChange={() => handlePermissionChange(func.id)}
                  >
                    {func.name}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </>
        )}
      </>
    )
}

export default PermissionGroupTab