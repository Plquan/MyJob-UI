import { Footer } from "antd/es/layout/layout"

const DefaultFooter = () => {
    return (
        <>
<Footer className="bg-gradient-to-r pt-14 pb-6 px-4 mt-0" style={{background: 'linear-gradient(to right, #000, #7b68ee)'}}>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 text-white mt-5">
    <div className="pl-14 pr-14">
      <div className="font-bold text-lg mb-3">Về chúng tôi</div>
      <ul className="space-y-2 text-[13.5px]">
        <li><a href="#" className="hover:underline text-white!">Giới thiệu</a></li>
        <li><a href="#" className="hover:underline text-white!">Liên hệ</a></li>
        <li><a href="#" className="hover:underline text-white!">Điều khoản sử dụng</a></li>
        <li><a href="#" className="hover:underline text-white!">Chính sách bảo mật</a></li>
      </ul>
    </div>
    <div>
      <div className="font-bold text-lg mb-3">Dành cho ứng viên</div>
      <ul className="space-y-2 text-[13.5px]">
        <li><a href="#" className="hover:underline text-white!">Việc làm mới nhất</a></li>
        <li><a href="#" className="hover:underline text-white!">Tạo CV</a></li>
        <li><a href="#" className="hover:underline text-white!">Cẩm nang nghề nghiệp</a></li>
        <li><a href="#" className="hover:underline text-white!">Tra cứu lương</a></li>
      </ul>
    </div>
    <div>
      <div className="font-bold text-lg mb-3">Dành cho nhà tuyển dụng</div>
      <ul className="space-y-2 text-[13.5px]">
        <li><a href="#" className="hover:underline text-white!">Đăng tin tuyển dụng</a></li>
        <li><a href="#" className="hover:underline text-white!">Tìm hồ sơ</a></li>
        <li><a href="#" className="hover:underline text-white!">Giải pháp HR</a></li>
        <li><a href="#" className="hover:underline text-white!">Bảng giá dịch vụ</a></li>
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
</Footer>

        </>
    )
}
export default DefaultFooter