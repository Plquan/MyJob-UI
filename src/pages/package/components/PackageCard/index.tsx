import { Row, Col, Card, Empty, Button, Tooltip, Spin } from "antd"
import { CheckCircleOutlined, ShoppingCartOutlined, QuestionCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../stores";
import { useEffect, useState } from "react";
import { packageActions } from "../../../../stores/packageStore/packageReducer";
import { formatVND } from "../../../../ultils/functions/formatVND";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../../../routes/routePath";
import { ROLE_NAME } from "../../../../constant/role";

const { Title } = Typography;

export const PackageCard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { packagesWithFeatures, loading} = useSelector((state: RootState) => state.packageStore)
  const {isAuthenticated,currentUser} = useSelector((state: RootState)=> state.authStore)
  useEffect(() => {
     dispatch(packageActions.getAllPackagesWithFeatures())
  },[dispatch])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const showConfirmModal = (pkg: any) => {
    if(!isAuthenticated || currentUser?.roleName != ROLE_NAME.EMPLOYER){
      navigate(ROUTE_PATH.EMPLOYER_LOGIN)
    }
    else{
    setSelectedPackage(pkg)
    setIsModalOpen(true)
    }
  }

  const handleOk = () => {   
    setIsModalOpen(false)
    setSelectedPackage(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedPackage(null)
  }

 return (
    <>
     {loading ? <div className="text-center">Đang tải...</div>  : <div className="text-center mb-8">
          <Title level={3} className="!mb-6">Các Gói Dịch Vụ Đăng Tuyển</Title>
          <Row gutter={[24, 24]} justify="start">
            {packagesWithFeatures?.map((pkg: any) => (
              <Col xs={24} md={8} key={pkg.name}>
                <Card
                  title={<><span className={`font-medium text-lg text-blue-400`}>{pkg.name}</span>                 
                  <div className="text-center">
                  <span className="text-medium ">{formatVND(pkg.price)}</span> 
                    <span className="text-xs text-gray-500"> / 30 ngày</span>
                  </div>
                  </>}
                  className="shadow-lg rounded-xl h-full"
                  extra={
                    <Tooltip title="Thanh toán">
                      <Button icon={<ShoppingCartOutlined className="text-blue-400!" />} onClick={() => showConfirmModal(pkg)} />
                    </Tooltip>
                  }
                >

                <ul className="space-y-2">
                      {pkg.features.map((f: any, idx: number) =>
                        f ? (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <CheckCircleOutlined className="text-green-500!" />
                            <span>{typeof f === "string" ? f : f.text}</span>
                          </li>
                        ) : (
                           <div className="flex justify-center items-center min-h-[60px]">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                        )
                      )}
                    </ul>

                </Card>
              </Col>
            ))}
          </Row>
        </div>}
       
        <Modal
          title={
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Xác nhận thanh toán
              <Tooltip title="Khi thanh toán gói mới, gói cũ sẽ bị vô hiệu hóa.">
                <QuestionCircleFilled  style={{ color: '#888', fontSize: 12, cursor: 'pointer' }} />
              </Tooltip>
            </span>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Hủy"
          centered
        >
          <p>Bạn có chắc chắn muốn thanh toán cho gói <b className="text-blue-400">{selectedPackage?.name}</b>?</p>
        </Modal>
    </>
)
}

export default PackageCard