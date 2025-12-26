import { Card, Row, Col, Progress, Tag, Button, Statistic, Descriptions, Space, Badge } from 'antd';
import {
  UserOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CalendarOutlined,
  CrownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

interface PackageUsageData {
  id: number;
  packageId: number;
  companyId: number;
  candidateSearchUsed: number;
  cvSearchUsed: number;
  jobPostUsed: number;
  createdAt: Date;
  updatedAt: Date;
  package: {
    id: number;
    name: string;
    price: number;
    durationInDays: number;
    jobHotDurationInDays: number;
    highlightCompanyDurationInDays: number;
    candidateSearchLimit: number;
    cvSearchLimit: number;
    jobPostLimit: number;
    description?: string;
    isActive: boolean;
  };
  expiryDate: Date;
}

const ManagePackage = () => {
  // Demo data
  const [packageData] = useState<PackageUsageData>({
    id: 1,
    packageId: 2,
    companyId: 1,
    candidateSearchUsed: 45,
    cvSearchUsed: 120,
    jobPostUsed: 8,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    package: {
      id: 2,
      name: 'Gói Premium',
      price: 5000000,
      durationInDays: 90,
      jobHotDurationInDays: 30,
      highlightCompanyDurationInDays: 30,
      candidateSearchLimit: 100,
      cvSearchLimit: 200,
      jobPostLimit: 15,
      description: 'Gói dịch vụ cao cấp dành cho doanh nghiệp có nhu cầu tuyển dụng lớn',
      isActive: true,
    },
    expiryDate: new Date('2024-04-15'),
  });

  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiry = new Date(packageData.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getProgressStatus = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'exception';
    if (percentage >= 70) return 'normal';
    return 'success';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const daysRemaining = calculateDaysRemaining();
  const isExpiringSoon = daysRemaining <= 10;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Quản lý gói dịch vụ
        </h1>
        <p className="text-gray-600">
          Theo dõi và quản lý gói dịch vụ hiện tại của doanh nghiệp
        </p>
      </div>

      {/* Package Info Card */}
      <Card 
        className="mb-6 shadow-lg border-t-4 border-t-[#154C91]"
        title={
          <div className="flex items-center justify-between">
            <Space>
              <CrownOutlined className="text-2xl text-yellow-500" />
              <span className="text-xl font-semibold">{packageData.package.name}</span>
              <Tag color="green">Đang hoạt động</Tag>
            </Space>
            <Button type="primary" icon={<ShoppingCartOutlined />} className="bg-[#154C91]">
              Nâng cấp gói
            </Button>
          </div>
        }
      >
        <Row gutter={[24, 24]}>
          {/* Left Column - Stats */}
          <Col xs={24} lg={8}>
            <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="text-center">
                <CalendarOutlined className="text-5xl text-[#154C91] mb-4" />
                <Statistic
                  title={<span className="text-lg font-semibold">Số ngày còn lại</span>}
                  value={daysRemaining}
                  suffix="ngày"
                  valueStyle={{ 
                    color: isExpiringSoon ? '#ff4d4f' : '#3f8600',
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                />
                {isExpiringSoon && (
                  <Tag color="red" className="mt-2">
                    Sắp hết hạn!
                  </Tag>
                )}
                <div className="mt-4 text-gray-600">
                  <div>Ngày kích hoạt: <strong>{new Date(packageData.createdAt).toLocaleDateString('vi-VN')}</strong></div>
                  <div>Ngày hết hạn: <strong>{new Date(packageData.expiryDate).toLocaleDateString('vi-VN')}</strong></div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column - Package Details */}
          <Col xs={24} lg={16}>
            <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
              <Descriptions.Item label="Tên gói" span={2}>
                <strong className="text-lg">{packageData.package.name}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Giá gói">
                <strong className="text-green-600">{formatCurrency(packageData.package.price)}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Thời hạn">
                <strong>{packageData.package.durationInDays} ngày</strong>
              </Descriptions.Item>
              <Descriptions.Item label={<><ThunderboltOutlined /> Thời gian Job Hot</>}>
                <Tag color="orange">{packageData.package.jobHotDurationInDays} ngày</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<><TrophyOutlined /> Nổi bật công ty</>}>
                <Tag color="gold">{packageData.package.highlightCompanyDurationInDays} ngày</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={2}>
                {packageData.package.description}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Usage Statistics */}
      <Row gutter={[16, 16]}>
        {/* Candidate Search Usage */}
        <Col xs={24} md={8}>
          <Card 
            className="shadow-md hover:shadow-xl transition-shadow"
            title={
              <Space>
                <UserOutlined className="text-blue-500 text-xl" />
                <span className="font-semibold">Tìm kiếm ứng viên</span>
              </Space>
            }
            extra={
              <Badge 
                count={packageData.package.candidateSearchLimit - packageData.candidateSearchUsed}
                style={{ backgroundColor: '#52c41a' }}
                overflowCount={999}
                showZero
              />
            }
          >
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Đã sử dụng</span>
                <span className="font-semibold text-lg">
                  {packageData.candidateSearchUsed} / {packageData.package.candidateSearchLimit}
                </span>
              </div>
              <Progress
                percent={Math.round((packageData.candidateSearchUsed / packageData.package.candidateSearchLimit) * 100)}
                status={getProgressStatus(packageData.candidateSearchUsed, packageData.package.candidateSearchLimit)}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {packageData.package.candidateSearchLimit - packageData.candidateSearchUsed}
              </div>
              <div className="text-sm text-gray-600 mt-1">Lượt còn lại</div>
            </div>
          </Card>
        </Col>

        {/* CV Search Usage */}
        <Col xs={24} md={8}>
          <Card 
            className="shadow-md hover:shadow-xl transition-shadow"
            title={
              <Space>
                <FileSearchOutlined className="text-purple-500 text-xl" />
                <span className="font-semibold">Tìm kiếm CV</span>
              </Space>
            }
            extra={
              <Badge 
                count={packageData.package.cvSearchLimit - packageData.cvSearchUsed}
                style={{ backgroundColor: '#722ed1' }}
                overflowCount={999}
                showZero
              />
            }
          >
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Đã sử dụng</span>
                <span className="font-semibold text-lg">
                  {packageData.cvSearchUsed} / {packageData.package.cvSearchLimit}
                </span>
              </div>
              <Progress
                percent={Math.round((packageData.cvSearchUsed / packageData.package.cvSearchLimit) * 100)}
                status={getProgressStatus(packageData.cvSearchUsed, packageData.package.cvSearchLimit)}
                strokeColor={{
                  '0%': '#722ed1',
                  '100%': '#eb2f96',
                }}
              />
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {packageData.package.cvSearchLimit - packageData.cvSearchUsed}
              </div>
              <div className="text-sm text-gray-600 mt-1">Lượt còn lại</div>
            </div>
          </Card>
        </Col>

        {/* Job Post Usage */}
        <Col xs={24} md={8}>
          <Card 
            className="shadow-md hover:shadow-xl transition-shadow"
            title={
              <Space>
                <FileTextOutlined className="text-green-500 text-xl" />
                <span className="font-semibold">Đăng tin tuyển dụng</span>
              </Space>
            }
            extra={
              <Badge 
                count={packageData.package.jobPostLimit - packageData.jobPostUsed}
                style={{ backgroundColor: '#52c41a' }}
                overflowCount={999}
                showZero
              />
            }
          >
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Đã sử dụng</span>
                <span className="font-semibold text-lg">
                  {packageData.jobPostUsed} / {packageData.package.jobPostLimit}
                </span>
              </div>
              <Progress
                percent={Math.round((packageData.jobPostUsed / packageData.package.jobPostLimit) * 100)}
                status={getProgressStatus(packageData.jobPostUsed, packageData.package.jobPostLimit)}
                strokeColor={{
                  '0%': '#52c41a',
                  '100%': '#95de64',
                }}
              />
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {packageData.package.jobPostLimit - packageData.jobPostUsed}
              </div>
              <div className="text-sm text-gray-600 mt-1">Tin còn lại</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card className="mt-6 shadow-md" title="Hành động nhanh">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<ShoppingCartOutlined />}
              className="bg-[#154C91] h-auto py-4"
            >
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">Mua thêm gói</span>
                <span className="text-xs opacity-80">Nâng cấp dịch vụ</span>
              </div>
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button 
              size="large" 
              block 
              icon={<UserOutlined />}
              className="h-auto py-4 border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">Tìm ứng viên</span>
                <span className="text-xs opacity-80">Bắt đầu tìm kiếm</span>
              </div>
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button 
              size="large" 
              block 
              icon={<FileTextOutlined />}
              className="h-auto py-4 border-green-500 text-green-500 hover:bg-green-50"
            >
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">Đăng tin</span>
                <span className="text-xs opacity-80">Tạo tin tuyển dụng</span>
              </div>
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button 
              size="large" 
              block 
              icon={<CalendarOutlined />}
              className="h-auto py-4 border-purple-500 text-purple-500 hover:bg-purple-50"
            >
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">Lịch sử</span>
                <span className="text-xs opacity-80">Xem chi tiết</span>
              </div>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ManagePackage;

