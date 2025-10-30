import EmployerHeader from "../../layouts/EmployerLayout/components/Header"
import { Typography, Button } from "antd"
import CustomDivider from "../../components/Divider";
import DefaultFooter from "../../layouts/components/footer/DefaultFooter";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../routes/routePath";
import FaqSection from "./components/FaqSection";
import PartnerSection from "./components/PartnerSection";
import RecruitmentProcess from "./components/RecruitmentProcess";
import BenefitSection from "./components/BenefitSection";
import PackageCard from "./components/PackageCard";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
const { Title, Text } = Typography;

const ProductPage = () => {
    const navigate = useNavigate()
  return (
    <>
      <EmployerHeader />
      <div className="mx-auto bg-gray-50">     
       <div className="px-5 py-5">
       <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTE_PATH.HOME)} type="primary">Quay lại trang chủ</Button>

       <div className="px-25">
       <div className="text-center mb-8">
          <Title level={2} className="!mb-2">Dịch vụ của chúng tôi</Title>
          <Text className="text-gray-500">Tìm kiếm và tuyển dụng ứng viên phù hợp nhanh chóng với các gói dịch vụ đăng tuyển đa dạng.</Text>
        </div>
        <CustomDivider/>
        <PackageCard/>
        <CustomDivider/>
        <BenefitSection/>
        <CustomDivider/>
        <RecruitmentProcess/>
        <CustomDivider/>
        <FaqSection/>
        <CustomDivider/>
        <PartnerSection/>
       </div>
       </div>
      </div>
      <DefaultFooter/>
    </>
  )
}
export default ProductPage