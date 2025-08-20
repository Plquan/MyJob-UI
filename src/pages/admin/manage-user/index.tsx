import  {  } from 'react';
import { Tabs, Card } from 'antd';
import TableUser from './components/TableUser';
import CreateUserPage from './components/CreateUser';
import UserInfoPage from './components/UserDetail';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../stores';
import type { IUserData } from '../../../types/user/UserType';
import { userActions } from '../../../stores/userStore/userReducer';
const ManageUserPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {selectedUser,currentTab} = useSelector((state: RootState) => state.userStore);



  const handleTabChange = (key: string) => {
    dispatch(userActions.setCurrentTab(key))
  };

  const handleSelectUser = (user:IUserData) => {
    dispatch(userActions.setSelectedUser(user));
    dispatch(userActions.setCurrentTab('3'))
  }

  return (
    
    <Card title={"Quản lí người dùng"}>
      <Tabs 
        activeKey={currentTab} 
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
