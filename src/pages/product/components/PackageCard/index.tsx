import { Row, Col, Card, Button, Tooltip, List, Tag } from "antd"
import { ShoppingCartOutlined, QuestionCircleFilled, TrophyOutlined, SearchOutlined, FileTextOutlined, PushpinOutlined } from "@ant-design/icons";
import { Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import { useEffect, useState } from "react";
import { packageActions } from "../../../../stores/packageStore/packageReducer";
import { formatVND } from "../../../../ultils/functions/formatVND";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../../../routes/routePath";
import { EUserRole } from "../../../../constant/role";

const { Title } = Typography;

export const PackageCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { packages, loading, isSubmiting } = useSelector((state: RootState) => state.packageStore)
  const { isAuthenticated, currentUser } = useSelector((state: RootState) => state.authStore)
  useEffect(() => {
    dispatch(packageActions.getPackages())
  }, [dispatch])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const showConfirmModal = (pkg: any) => {
    if (!isAuthenticated || currentUser?.role != EUserRole.EMPLOYER) {
      navigate(ROUTE_PATH.EMPLOYER_LOGIN)
    }
    else {
      setSelectedPackage(pkg)
      setIsModalOpen(true)
    }
  }

  const handleOk = async () => {
    if (selectedPackage) {
      try {
        await dispatch(packageActions.purchasePackage(selectedPackage.id)).unwrap();
        setIsModalOpen(false);
        setSelectedPackage(null);
        // Navigate to manage package page after successful purchase
        navigate(ROUTE_PATH.EMPLOYER_MANAGE_PACKAGE);
      } catch (error) {
        // Error is already handled by reducer with message.error
        console.error('Purchase failed:', error);
      }
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedPackage(null)
  }

  const getPackageFeatures = (pkg: any) => {
    const features = [
      {
        icon: <PushpinOutlined className="text-blue-500" />,
        name: "Tin nổi bật",
        value: pkg.jobHotDurationInDays > 0 ? `${pkg.jobHotDurationInDays} ngày` : "Không có",
        color: pkg.jobHotDurationInDays > 0 ? "green" : "red"
      },
      {
        icon: <TrophyOutlined className="text-blue-500" />,
        name: "Công ty nổi bật",
        value: pkg.highlightCompanyDurationInDays > 0 ? `${pkg.highlightCompanyDurationInDays} ngày` : "Không có",
        color: pkg.highlightCompanyDurationInDays > 0 ? "green" : "red"
      },
      {
        icon: <SearchOutlined className="text-blue-500" />,
        name: "Tìm ứng viên",
        value: pkg.candidateSearchLimit > 0 ? `${pkg.candidateSearchLimit} lượt` : "Không có",
        color: pkg.candidateSearchLimit > 0 ? "blue" : "red"
      },
      {
        icon: <FileTextOutlined className="text-blue-500" />,
        name: "Xem hồ sơ",
        value: pkg.cvSearchLimit > 0 ? `${pkg.cvSearchLimit} lượt` : "Không có",
        color: pkg.cvSearchLimit > 0 ? "blue" : "red"
      },
      {
        icon: <PushpinOutlined className="text-blue-500" />,
        name: "Đăng tin",
        value: pkg.jobPostLimit > 0 ? `${pkg.jobPostLimit} tin` : "Không có",
        color: pkg.jobPostLimit > 0 ? "blue" : "red"
      }
    ];

    return features.filter(feature => !feature.value.includes("Không có"));
  };

  return (
    <>
      {loading ? <div className="text-center">Đang tải...</div> : <div className="text-center mb-8">
        <Title level={3} className="!mb-6">Các Gói Dịch Vụ Đăng Tuyển</Title>
        <Row gutter={[24, 24]} justify="start">
          {packages?.map((pkg: any) => {
            const features = getPackageFeatures(pkg);

            return (
              <Col xs={24} md={8} key={pkg.name}>
                <Card
                  title={
                    <div className="text-center">
                       <div className="font-medium text-lg text-blue-500 mb-1 mt-2 truncate" title={pkg.name}>{pkg.name}</div>
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <div className="text-base">{formatVND(pkg.price)}</div>
                        <div className="text-xs text-gray-400">/ {pkg.durationInDays} ngày</div>
                      </div>
                    </div>
                  }
                  className="shadow-lg rounded-xl h-full"
                  extra={
                    <Tooltip title="Thanh toán">
                      <Button
                        type="default"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => showConfirmModal(pkg)}
                      />
                    </Tooltip>
                  }
                >
                  <List
                    size="small"
                    dataSource={features}
                    renderItem={(feature) => (
                      <List.Item className="!px-0 !py-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {feature.icon}
                          <span className="text-sm text-gray-700">{feature.name}</span>
                        </div>
                        <Tag color={feature.color} className="text-xs">
                          {feature.value}
                        </Tag>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>}

      <Modal
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Xác nhận thanh toán
            <Tooltip title="Khi thanh toán gói mới, gói cũ sẽ bị vô hiệu hóa.">
              <QuestionCircleFilled style={{ color: '#888', fontSize: 12, cursor: 'pointer' }} />
            </Tooltip>
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        centered
        confirmLoading={isSubmiting}
        okButtonProps={{ disabled: isSubmiting }}
      >
        <p>Bạn có chắc chắn muốn thanh toán cho gói <b className="text-blue-400">{selectedPackage?.name}</b>?</p>
        {selectedPackage && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 mb-1">Giá: <strong className="text-green-600">{formatVND(selectedPackage.price)}</strong></p>
            <p className="text-sm text-gray-600">Thời hạn: <strong>{selectedPackage.durationInDays} ngày</strong></p>
          </div>
        )}
      </Modal>
    </>
  )
}

export default PackageCard