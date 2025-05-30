import  {  } from 'react';
import {  Select, Input } from 'antd';
import TableUser from './components/TableUser';


const ManageUserPage = () => {
;
  

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

    <TableUser/>
    </>
  );
};

export default ManageUserPage;
