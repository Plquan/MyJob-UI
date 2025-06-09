import  {  } from 'react';
import { Tabs, Select, Input, Card } from 'antd';
import TableUser from './components/TableUser';
import CreateUserPage from './components/CreateUser';
import UserInfoPage from './components/UserDetail';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import { useState } from 'react';
import type { IUserData } from '../../../types/user/UserType';
import { userActions } from '../../../stores/userStore/userReducer';
const ManageUserPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {selectedUser} = useSelector((state: RootState) => state.userStore);
  const [activeKey, setActiveKey] = useState('1');


  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleSelectUser = (user:IUserData) => {
    dispatch(userActions.setSelectedUser(user));
    setActiveKey('3');
  };


  return (
    
    <Card title={"Quản lí người dùng"}>
      <Tabs 
        activeKey={activeKey} 
        onChange={handleTabChange}
        items={[
          {
            key: '1',
            label: 'Danh sách người dùng',
            children: (
              <>
                <TableUser handleSelectUser={handleSelectUser}/>
              </>
            ),
          },
          {
            key: '2',
            label: 'Thêm mới người dùng',
            children: (
              <>
               <CreateUserPage/>
              </>
            ),
          },
          {
            key: '3',
            label: 'Chi tiết người dùng',
            children: (
              <>
               <UserInfoPage/>
              </>
            ),
            disabled: !selectedUser,
          },
        ]} 
      />
    </Card>
  );
};

export default ManageUserPage;
