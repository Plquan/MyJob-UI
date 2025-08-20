import React, { useState } from 'react';
import { Card, Avatar, Button, Pagination, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const companiesPerPage = 6;

const companyData = [
  {
    id: 1,
    name: 'Công Ty TNHH Thương Mại Dịch Vụ Sản Xuất Vũ Gia Khang',
    industry: 'Chăm sóc khách hàng',
    location: 'TP.HCM',
    employees: '10000+ nhân viên',
    jobs: '1 việc làm',
    logo: 'https://via.placeholder.com/64?text=VGK',
    cover: 'https://source.unsplash.com/400x150/?flowers',
  },
  {
    id: 2,
    name: 'Công Ty TNHH Dược Phẩm Khang Duy',
    industry: 'Kế toán',
    location: 'TP.HCM',
    employees: '10000+ nhân viên',
    jobs: '1 việc làm',
    logo: 'https://via.placeholder.com/64?text=KD',
    cover: 'https://source.unsplash.com/400x150/?pills',
  },
  {
    id: 3,
    name: 'Công Ty Cổ Phần Bidicomed',
    industry: 'Kinh doanh',
    location: 'Cần Thơ',
    employees: '1000+ nhân viên',
    jobs: '1 việc làm',
    logo: 'https://via.placeholder.com/64?text=BD',
    cover: 'https://source.unsplash.com/400x150/?earth,night',
  },
  // Bạn có thể thêm thêm dữ liệu ở đây để có nhiều trang
];

const CompanyForm = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * companiesPerPage;
  const paginatedData = companyData.slice(startIndex, startIndex + companiesPerPage);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto">
      <h2 className="text-lg font-extrabold mb-5">
        <span className="text-red-500">{companyData.length}</span> công ty
      </h2>

      <Row gutter={[24, 24]}>
        {paginatedData.map((company) => (
          <Col xs={24} sm={12} md={8} key={company.id}>
            <Card
              hoverable
              cover={<img alt="cover" src={company.cover} className="object-cover h-36" />}
            >
              <div className="flex items-center space-x-4 mb-2">
                <Avatar size="large" src={company.logo} icon={<UserOutlined />} />
                <div className="flex-1">
                  <h3 className="font-semibold text-md">{company.name}</h3>
                  <div className="text-sm text-gray-500">
                    📌 {company.industry} • 📍 {company.location} <br />
                    👥 {company.employees} • 💼 {company.jobs}
                  </div>
                </div>
              </div>
              <Button type="default" ghost className="border-yellow-500 text-yellow-500">
                + Theo dõi
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-6 text-center">
        <Pagination
          current={currentPage}
          pageSize={companiesPerPage}
          total={companyData.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CompanyForm;
