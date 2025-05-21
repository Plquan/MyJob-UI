const BannerSection = () => {
    return (
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
    )
}

export default BannerSection;