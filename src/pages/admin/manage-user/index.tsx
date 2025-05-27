import React from 'react';
import { Table, Button, Avatar, Select, Input } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, CloseCircleOutlined, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  id: number;
  avatar?: string;
  email: string;
  name: string;
  isVerifiedEmail: boolean;
  active: boolean;
  roleName: string;
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
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
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

const data: DataType[] = [
  {
    key: '1',
    id: 1,
    avatar: '',
    email: 'hoangpubg286@gmail.com',
    name: 'User 1',
    isVerifiedEmail: false,
    active: false,
    roleName: 'Người dùng',
  },
  {
    key: '2',
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'nvhhoang286@gmail.com',
    name: 'User 2',
    isVerifiedEmail: true,
    active: false,
    roleName: 'Người dùng',
  },
  {
    key: '3',
    id: 3,
    avatar: '',
    email: 'acerbee@onlinecmail.com',
    name: 'User 3',
    isVerifiedEmail: true,
    active: true,
    roleName: 'Nhà tuyển dụng',
  },
  {
    key: '4',
    id: 4,
    avatar: '',
    email: 'admin@admin',
    name: 'User 4',
    isVerifiedEmail: true,
    active: true,
    roleName: 'Admin',
  },
  {
    key: '5',
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'acerbee@amazinggift.life',
    name: 'User 5',
    isVerifiedEmail: false,
    active: true,
    roleName: 'Nhà tuyển dụng',
  },
];

const ManageUserPage = () => {
  return (
    <>
      <p className="text-l font-bold text-gray-700 py-2">Quản lý người dùng</p>

      <div className="mb-4 flex space-x-4 items-center">
        <Input.Search placeholder="Tìm kiếm theo tên hoặc ..." className="w-70!" />
        <Select defaultValue="all-roles" className="w-40 mr-2!">
          <Select.Option value="all-roles">Tất cả vai trò</Select.Option>
        </Select>
        <Select defaultValue="all-status" className="w-40">
          <Select.Option value="all-status">Tất cả</Select.Option>
        </Select>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />
    </>
  );
};

export default ManageUserPage;
