import { Table, Avatar } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IUserData } from '../../../../../types/user/UserType';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userActions } from '../../../../../stores/userStore/userReducer';
import type { AppDispatch, RootState } from '../../../../../stores';
import { replace, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../../../routes/routePath';
import { formatRoute } from '../../../../../ultils/functions/formatRoute';

interface DataType extends IUserData {
  key: React.Key;
}

const DEFAULT_AVATAR = 'https://joeschmoe.io/api/v1/random';

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
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
    dataIndex: 'isVerifiedEmail',
    key: 'isVerifiedEmail',
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
    dataIndex: 'active',
    key: 'active',
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
      return <span>{roleName}</span>;
    },
  },
];



const TableUser = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const [data, setData] = useState<DataType[]>([]);
    const { users, loading } = useSelector((state: RootState) => state.userStore);
    useEffect(() => {
      dispatch(userActions.getAllUsers());
    }, [dispatch]);


    useEffect(() => {
      if (users) {
        setData(
          users.map((item, index) => {
            return {
              ...item,
              key: index,
            };
          })
        );
      }
    }, [users]);

    const handleRowClick = (record: IUserData) => {
        dispatch(userActions.setSelectedUser(record));
        navigate( ROUTE_PATH.ADMIN_USER.replace(":slug", record.fullName));
    };

    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            pagination={{ pageSize: 10 }} 
            scroll={{ x: 900 }} 
            loading={loading}
            onRow={(record) => ({
                onClick: () =>  handleRowClick(record),
                style: { cursor: 'pointer' }
            })}
        />
    );
};

export default TableUser; 
