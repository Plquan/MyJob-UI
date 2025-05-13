
import { Button, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Mũi tên từ Ant Design Icons

export default function FeaturedCompanySection() {
  const companies = [
    {
      logo: '/assets/vinhuni.png',
      name: 'FPT Telecom',
    },
    {
      logo: 'https://www.vietinbank.vn/sites/all/themes/vtb/images/logo.png',
      name: 'Ngân Hàng TMCP Công Thương Việt Nam',
    },
    {
      logo: 'https://afotech.vn/wp-content/uploads/2021/07/logo-afotech.png',
      name: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ AFOTECH',
    },
    {
      logo: 'https://kimtingroup.com/wp-content/uploads/2021/07/logo.png',
      name: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN KIM TÍN',
    },
    {
      logo: 'https://via.placeholder.com/150',
      name: 'Company 5',
    },
    {
      logo: 'https://via.placeholder.com/150',
      name: 'Company 6',
    },
  ];
  const arrowStyle = "absolute top-[40%] -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black text-xl rounded-full hover:bg-gray-100 z-10";

  // Mũi tên trái
  const PrevArrow = (props: any) => (
    <div className={`${arrowStyle} left-[-35px]`} onClick={props.onClick}>
      <LeftOutlined />
    </div>
  );
  
  // Mũi tên phải
  const NextArrow = (props: any) => (
    <div className={`${arrowStyle} right-[-35px]`} onClick={props.onClick}>
      <RightOutlined />
    </div>
  );
  

  return (
    <section className="bg-white py-16 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Công ty hàng đầu</h2>

        <Carousel
          slidesToShow={4}
          slidesToScroll={4}
          autoplay
          arrows
          dots={false}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {companies.map((company, idx) => (
            <div key={idx} className="flex justify-center">
              <div className="bg-white mb-10 mx-2 rounded-xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain rounded-full mb-3 border"
                />
                <div className="font-semibold text-lg mb-1 w-full truncate" title={company.name}>
                  {company.name}
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="flex justify-center">
          <Button className="bg-[#6A5ACD]! text-white!  hover:opacity-90 transition">
            Xem thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
