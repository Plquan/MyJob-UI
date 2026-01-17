import { Card, Row, Col, Progress, Tag, Button, Spin } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  CrownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { packageActions } from '@/stores/packageStore/packageReducer';
import type { AppDispatch, RootState } from '@/stores';
import ROUTE_PATH from '@/routes/routePath';

const ManagePackage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { companyPackage, loading } = useSelector((state: RootState) => state.packageStore);

  useEffect(() => {
    dispatch(packageActions.getCompanyPackage());
  }, [dispatch]);

  const calculateDaysRemaining = () => {
    if (!companyPackage) return 0;
    const today = new Date();
    const expiry = new Date(companyPackage.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getProgressStatus = (remaining: number, limit: number) => {
    const percentage = ((limit - remaining) / limit) * 100;
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (!companyPackage) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <CrownOutlined className="text-6xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Chưa có gói dịch vụ
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn chưa đăng ký gói dịch vụ nào. Vui lòng chọn gói phù hợp để bắt đầu sử dụng.
          </p>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate(ROUTE_PATH.PRODUCTS)}
            className="bg-[#154C91] h-auto py-2 px-6"
          >
            Xem các gói dịch vụ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card title="Quản lý gói dịch vụ" extra={
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => navigate(ROUTE_PATH.PRODUCTS)}
        className="bg-[#154C91]!"
      >
      </Button>
    }>

      {/* Package Info Card */}
      <Card className="mb-6!">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-2">{companyPackage.package.name}</span>
            <Tag color="green" className="ml-2">Đang hoạt động</Tag>
          </div>
          <Button
            type="primary"
            // icon={<ClockCircleOutlined />}
            onClick={() => navigate(ROUTE_PATH.PRODUCTS)}
            className="bg-[#154C91]!"
          >
            Gia hạn
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <div className="text-sm text-gray-600">Giá gói</div>
            <div className="text-base font-semibold text-green-600">{formatCurrency(companyPackage.package.price)}</div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="text-sm text-gray-600">Ngày hết hạn</div>
            <div className="text-base font-semibold">{new Date(companyPackage.expiryDate).toLocaleDateString('vi-VN')}</div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="text-sm text-gray-600">Còn lại</div>
            <div className={`text-base font-semibold ${isExpiringSoon ? 'text-red-600' : 'text-green-600'}`}>
              {daysRemaining} ngày
              {isExpiringSoon && <Tag color="red" className="ml-2!">Sắp hết hạn</Tag>}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Usage Statistics */}
      <Card className="mb-6!" title="Sử dụng gói dịch vụ">
        <div className="space-y-6">
          {/* Job Post Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileTextOutlined className="text-green-500 mr-2" />
                <span className="font-medium">Đăng tin tuyển dụng</span>
                <span className="text-xs text-gray-500 ml-2">(Số lượt còn lại)</span>
              </div>
              <span className="text-sm text-gray-600">
                {companyPackage.jobPostRemaining} / {companyPackage.package.jobPostLimit}
              </span>
            </div>
            <Progress
              percent={Math.round(((companyPackage.package.jobPostLimit - companyPackage.jobPostRemaining) / companyPackage.package.jobPostLimit) * 100)}
              status={getProgressStatus(companyPackage.jobPostRemaining, companyPackage.package.jobPostLimit)}
              strokeColor="#52c41a"
            />
          </div>

          {/* Candidate Search Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <UserOutlined className="text-blue-500 mr-2" />
                <span className="font-medium">Tìm ứng viên</span>
                <span className="text-xs text-gray-500 ml-2">(Số lượt còn lại)</span>
              </div>
              <span className="text-sm text-gray-600">
                {companyPackage.candidateSearchRemaining} / {companyPackage.package.candidateSearchLimit}
              </span>
            </div>
            <Progress
              percent={Math.round(((companyPackage.package.candidateSearchLimit - companyPackage.candidateSearchRemaining) / companyPackage.package.candidateSearchLimit) * 100)}
              status={getProgressStatus(companyPackage.candidateSearchRemaining, companyPackage.package.candidateSearchLimit)}
              strokeColor="#1890ff"
            />
          </div>
        </div>
      </Card>

      {/* Bonus Features */}
      <Card title="Tính năng đặc biệt">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <TrophyOutlined className="text-orange-500 text-lg mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Công ty nổi bật</span>
                  <span className="text-xs text-gray-500">Thời gian hiển thị nổi bật</span>
                </div>
              </div>
              <Tag color="gold">{companyPackage.package.highlightCompanyDurationInDays} ngày</Tag>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <ThunderboltOutlined className="text-red-500 text-lg mr-2" />
                <div className="flex flex-col">
                  <span className="font-medium">Job nổi bật</span>
                  <span className="text-xs text-gray-500">Thời gian hiển thị nổi bật</span>
                </div>
              </div>
              <Tag color="orange">{companyPackage.package.jobHotDurationInDays} ngày</Tag>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default ManagePackage;

