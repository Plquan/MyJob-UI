
import TrendingSection from "./components/TrendingSection";
import FeaturedCompanySection from "./components/FeaturedCompanySection";
import FeaturedJobsSection from "./components/FeaturedJobsSection";
import JobSearchBar from "./components/JobSearchBar";

export default function HomePage() {
  return (
    <>
<section className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] pt-24 pb-16 text-center text-white">
<h1 style={{ fontFamily: 'FZ Poppins', fontWeight: 900}} className="text-[80px] md:text-[60px] leading-tight text-center">
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

<JobSearchBar />
  
<TrendingSection />
</section>
<FeaturedCompanySection />

<FeaturedJobsSection />

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
    </>
  );
}