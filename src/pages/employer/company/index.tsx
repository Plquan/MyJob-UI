import React, { useState } from 'react';
import { Card, Tabs, type UploadFile, type UploadProps } from 'antd';
import Logo from './components/logo';
import Banner from './components/banner';
import CompanyInfoForm from './components/companyInfoForm';
const { TabPane } = Tabs;
const EmployerCompanyPage: React.FC = () => {
  const [logoFile, setLogoFile] = useState<UploadFile[]>([]);
  const [bannerFile, setBannerFile] = useState<UploadFile[]>([]);

  const handleLogoUpload: UploadProps['onChange'] = ({ fileList }) => {
    setLogoFile(fileList);
  };

  const handleBannerUpload: UploadProps['onChange'] = ({ fileList }) => {
    setBannerFile(fileList);
  };

  return (
    <Card>
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Thông tin công ty" key="1">
        <Logo logoFile={logoFile} onLogoUpload={handleLogoUpload} />
        <Banner bannerFile={bannerFile} onBannerUpload={handleBannerUpload} />
        <CompanyInfoForm />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Đa phương tiện" key="2">
        {/* Component quản lý media */}
        {/* <MediaManager /> */}
      </Tabs.TabPane>
    </Tabs>
  </Card>
  );
};

export default EmployerCompanyPage;
