import { Table, Avatar } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../../../../../stores';
import type { IUserData, IUserFilter } from '../../../../../types/user/UserType';
import { userActions } from '../../../../../stores/userStore/userReducer';
import FilterUser from '../FilterUser';
import { mapRole } from '../../../../../ultils/functions/mapper';
import env from '../../../../../constant/env';

interface DataType extends IUserData {
  key: React.Key;
}

const DEFAULT_AVATAR = env.DEFAULT_AVATAR;

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
    width: 60,
  },
  {
    title: 'Ảnh',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
    render: (avatar) => <Avatar src={avatar || DEFAULT_AVATAR} />,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
    render: (_, record) => {
      return record.email
    },
  },
  {
    title: 'Họ tên',
    dataIndex: 'fullName',
    key: 'name',
    ellipsis: true,
  },
  {
    title: 'Xác thực email',
    dataIndex: 'isVerifyEmail',
    key: 'isVerifyEmail',
    align: 'center',
    render: (verified: boolean) =>
      verified ? (
        <CheckCircleFilled style={{ color: '#3CB371', fontSize: '14px' }} />
      ) : (
        <CloseCircleFilled style={{ color: '#B22222', fontSize: '14px' }} />
      ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
    align: 'center',
    render: (active: boolean) =>
      active ? (
        <CheckCircleFilled  style={{ color: '#3CB371', fontSize: '14px' }} />
      ) : (
        <StopOutlined  style={{ color: '#B22222', fontSize: '14px' }} />
      ),
  },
  {
    title: 'Vai trò',
    dataIndex: 'roleName',
    key: 'roleName',
    render: (roleName: string) => {
      return <span>{mapRole(roleName)}</span>;
    },
  },
]


interface TableUserProps {
  handleSelectUser: (user: IUserData) => void;
}

const TableUser: React.FC<TableUserProps> = ({ handleSelectUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<DataType[]>([]);
  const { users, loading,page,limit,totalItem } = useSelector((state: RootState) => state.userStore);
  const [filters, setFilters] = useState<IUserFilter>({
    searchKey: "",
    roleName: undefined,
    isActive: undefined,
    isVerifyEmail: undefined,
    page: page,
    limit: limit
  })

  const updateFilter = (newPartialFilter: Partial<IUserFilter>) => {
    const newFilters = {
      ...filters,
      ...newPartialFilter,
    };
    setFilters(newFilters);
    dispatch(userActions.getAllUsers(newFilters));
  };

  const handleSearch = (value: string) => {
    const newFilters = {
      ...filters,
      searchKey: value
    }
    setFilters(newFilters)
    dispatch(userActions.getAllUsers(newFilters))
  }

  useEffect(() => {
    dispatch(userActions.getAllUsers(filters));
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(
        users.map((item, index) => ({
          ...item,
          key: index + 1,
        }))
      );
    }
  }, [users]);

  const handleRowClick = (record: IUserData) => {
    dispatch(userActions.setSelectedUser(record))
    handleSelectUser(record)
  }

  return (
    <>
      <FilterUser 
        filters={filters}
        onFilterChange={updateFilter}
        onSearch={handleSearch}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        bordered
        pagination={{
          current: filters.page,
          pageSize: filters.limit,
          total: totalItem,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20','25'],
          onChange: (page, pageSize) => {
            updateFilter({ page: page, limit: pageSize })
          },
        }}
        scroll={{ x: 900 }}
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' },
        })}
      />
    </>
  );
};

export default TableUser;
