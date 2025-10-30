import React, { useEffect } from 'react';
import { Card, Tabs } from 'antd';
import CompanyInfoPage from './company-info';
import CompanyMediaPage from './company-media';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../stores';
import { companyActions } from '../../../stores/companyStore/companyReducer';
const EmployerCompanyPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(companyActions.getEmployerCompany());
  }, [dispatch]);

  const items = [
    {
      key: '1',
      label: 'Thông tin công ty',
      children: <CompanyInfoPage />
    },
    {
      key: '2',
      label: 'Đa phương tiện',
      children: <CompanyMediaPage />
    }
  ];

  return (
    <Card>
      <Tabs defaultActiveKey="1" items={items} />
    </Card>

  );
};

export default EmployerCompanyPage;
