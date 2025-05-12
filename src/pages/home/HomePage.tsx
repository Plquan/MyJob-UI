import { Button, Dropdown, Input, Select, Carousel } from "antd";
import {
  EnvironmentOutlined,

} from "@ant-design/icons";
import TrendingSection from "./components/TrendingSection";
import TrendingCompany from "./components/TrendingCompany";
import DefaultHeader from "../../layouts/components/headers/DefaultHeader";

export default function HomePage() {
  return (
    <>
    <DefaultHeader />

    <section className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] pt-24 pb-16 text-center text-white">
  <h1 style={{ fontFamily: 'FZ Poppins', fontWeight: 900,marginTop: '60px' }} className="text-[80px] md:text-[60px] leading-tight text-center">
    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
      Tìm việc làm mơ ước
    </span>
    <br />
    {/* Dòng 2: gradient yellow → pink */}
    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
      của bạn
    </span>
  </h1>

      <p className="text-xl md:text-2xl mb-6">
        Hơn <span className="font-bold text-yellow-400 text-3xl">10,000</span> việc làm đang chờ đợi bạn
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-2 mb-6">
        <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium border border-white/20 inline-block">
            Việc làm chất lượng
        </span>
        <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium border border-white/20 inline-block">
            Uy tín & Bảo mật
        </span>
        <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium border border-white/20 inline-block">
            Tốc độ phản hồi nhanh
        </span>
        </div>


  <div className="bg-white rounded-2xl mt-15 p-4 md:p-6 max-w-5xl mx-auto shadow-lg">
    <div className="flex items-center gap-3 justify-center w-full flex-wrap md:flex-nowrap pr-10 pl-10">
      
    {/* Input tìm kiếm */}
    <div className="relative flex-[3] min-w-[350px] w-full">
        {/* <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 text-lg z-10 pl-40!" /> */}
        <Input
            placeholder="Tìm kiếm việc làm, vị trí, công ty..."
            className="pl-10 h-11"
        />
     </div>

    {/* Select địa điểm */}
    <div className="relative w-56">
      <Select
        showSearch
        placeholder="Chọn địa điểm"
        className="w-full rounded-lg custom-select-location"
        suffixIcon={<EnvironmentOutlined className="text-pink-500 text-lg" />}
        style={{ width: '100%', height: 44 }}
        options={[
          { value: 'hanoi', label: 'Hà Nội' },
          { value: 'hcm', label: 'Hồ Chí Minh' },
          { value: 'danang', label: 'Đà Nẵng' },
          { value: 'haiphong', label: 'Hải Phòng' },
          { value: 'cantho', label: 'Cần Thơ' },
        ]}
      />
    </div>

    {/* Button lọc nâng cao */}
    <Button
      type="primary"
      size="large"
      className="h-11 px-6 bg-[rgb(123,104,238)] text-white font-semibold shadow-lg rounded-lg border-0 flex items-center gap-2"
      style={{ background: 'rgb(123,104,238)', border: 'none', height: 44 }}
    >
      <span className="mr-2">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
          <path d="M9 10h6" />
          <path d="M9 14h6" />
        </svg>
      </span>
      Lọc nâng cao
    </Button>
    
  </div>
</div>

    <TrendingSection />
    </section>
    <TrendingCompany />

    {/* Việc làm nổi bật */}
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">Việc làm nổi bật</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Card việc làm */}
          {[
            {
              logo: 'https://fpt-telecom.vn/assets/images/logo.png',
              title: 'Tuyển dụng Frontend Developer (React.js)',
              company: 'FPT Telecom',
              location: 'Thành phố Hà Nội',
              salary: '15.000.000 ₫',
              type: 'Toàn thời gian'
            },
            {
              logo: 'https://fpt-telecom.vn/assets/images/logo.png',
              title: 'Chuyên Viên Kinh Doanh Kênh Phân Phối B2C',
              company: 'FPT Telecom',
              location: 'Thành phố Hồ Chí Minh',
              salary: '20.000.000 ₫',
              type: 'Toàn thời gian'
            },
            {
              logo: 'https://fpt-telecom.vn/assets/images/logo.png',
              title: 'Nhân Viên Kỹ Thuật FPT Telecom - Q. Tân Bình',
              company: 'FPT Telecom',
              location: 'Thành phố Hồ Chí Minh',
              salary: '10.000.000 ₫',
              type: 'Toàn thời gian'
            },
          ].map((job, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 w-[320px] flex flex-col border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain rounded-full border" />
                <div className="font-semibold text-base truncate" title={job.title}>{job.title}</div>
              </div>
              <div className="text-gray-500 text-sm mb-1 truncate">{job.company}</div>
              <div className="flex items-center text-gray-600 text-sm mb-1 gap-1"><span>📍</span>{job.location}</div>
              <div className="flex items-center text-yellow-600 text-sm mb-1 gap-1"><span>💰</span>{job.salary}</div>
              <div className="flex items-center text-gray-600 text-sm mb-4 gap-1"><span>⏰</span>{job.type}</div>
              <button className="mt-auto px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition">Ứng tuyển ngay</button>
            </div>
          ))}
        </div>
      </div>
    </section>



    {/* Banner doanh nghiệp */}
    <section className="bg-[#f5f8fa] py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Tìm kiếm ứng viên tài năng cho<br />doanh nghiệp của bạn
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Tiếp cận với hàng nghìn hồ sơ ứng viên chất lượng. Đăng tin tuyển dụng dễ dàng và nhận được phản hồi nhanh chóng từ các ứng viên phù hợp.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#0096db] hover:bg-[#007bb8] text-white font-semibold px-8 py-3 rounded-lg text-lg flex items-center gap-2 shadow">
              <span className="text-xl">🎤</span> Đăng ký doanh nghiệp
            </button>
            <button className="border-2 border-[#0096db] text-[#0096db] hover:bg-[#e6f7ff] font-semibold px-8 py-3 rounded-lg text-lg flex items-center gap-2 shadow">
              <span className="text-xl">↪️</span> Đăng nhập
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src="/assets/hiring-banner.png" alt="Doanh nghiệp tuyển dụng" className="max-w-[400px] w-full" />
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] pt-14 pb-6 px-4 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 text-white">
        <div className="pl-14 pr-14">
          <div className="font-bold text-lg mb-3">Về chúng tôi</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Giới thiệu</a></li>
            <li><a href="#" className="hover:underline">Liên hệ</a></li>
            <li><a href="#" className="hover:underline">Điều khoản sử dụng</a></li>
            <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div>
        <div className="font-bold text-lg mb-3">Dành cho ứng viên</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Việc làm mới nhất</a></li>
            <li><a href="#" className="hover:underline">Tạo CV</a></li>
            <li><a href="#" className="hover:underline">Cẩm nang nghề nghiệp</a></li>
            <li><a href="#" className="hover:underline">Tra cứu lương</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-lg mb-3">Dành cho nhà tuyển dụng</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Đăng tin tuyển dụng</a></li>
            <li><a href="#" className="hover:underline">Tìm hồ sơ</a></li>
            <li><a href="#" className="hover:underline">Giải pháp HR</a></li>
            <li><a href="#" className="hover:underline">Bảng giá dịch vụ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-lg mb-3">Kết nối với chúng tôi</div>
          <div className="flex gap-4 text-2xl mb-3">
            <a href="#" className="hover:text-pink-300"><i className="fab fa-facebook-square"></i> <span className="sr-only">Facebook</span></a>
            <a href="#" className="hover:text-pink-300"><i className="fab fa-instagram"></i> <span className="sr-only">Instagram</span></a>
            <a href="#" className="hover:text-pink-300"><i className="fab fa-linkedin"></i> <span className="sr-only">LinkedIn</span></a>
            <a href="#" className="hover:text-pink-300"><i className="fab fa-twitter"></i> <span className="sr-only">Twitter</span></a>
          </div>
        </div>
      </div>
     <hr className="my-8 border-white/20 w-[79%] mx-auto" />
      <div className="text-center text-white/80 text-base">© 2024 MyJob. Giao diện clone.</div>
    </footer>

    </>
  );
}