import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../../../stores';
import { roleActions } from '../../../../../../stores/roleStore/roleReducer';

interface RoleSelectProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  disabled?: boolean;
}

const RoleSelect: React.FC<RoleSelectProps> = ({
  value,
  onChange,
  mode = 'multiple',
  placeholder = 'Chọn nhóm quyền',
  disabled = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, loading } = useSelector((state: RootState) => state.roleStore);

  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(roleActions.getAllRoles())
    }
  }, [dispatch])

  return (
    <Select
      mode={mode}
      placeholder={placeholder}
      value={value?.filter(v => v != null) || []}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
      options={roles?.filter(role => role.id != null).map((role) => ({
        label: role.name,
        value: role.id,
      }))}
      style={{ width: '100%' }}
    />
  );
};

export default RoleSelect; 