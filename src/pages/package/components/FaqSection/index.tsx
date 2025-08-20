import { Collapse, Typography, type CollapseProps } from "antd"
const { Title } = Typography

const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Làm thế nào để đăng kí tài khoản?',
      children: <p>Bạn có thể đăng ký tài khoản miễn phí trên trang của chúng tôi bằng cách nhấp vào nút 'Đăng ký'.</p>,
    },
    {
      key: '2',
      label: 'Tôi có thể hủy gói dịch vụ đã đăng ký không?',
      children: <p>Có, bạn có thể hủy gói dịch vụ bất cứ lúc nào trong phần quản lý tài khoản.</p>,
    },
    {
      key: '3',
      label: 'Hỗ trợ khách hàng hoạt động như thế nào?',
      children: <p>Chúng tôi có đội ngũ hỗ trợ trực tuyến 24/7 để giải đáp mọi thắc mắc của bạn.</p>,
    },
  ]
  
const FaqSection = () => {
    return (
        <>
         <div>
          <Title level={3} className="!mb-6">Câu hỏi thường gặp</Title>
            <Collapse accordion items={items} />
        </div></>
    )
}

export default FaqSection