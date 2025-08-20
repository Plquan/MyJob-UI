import { LoginOutlined, RocketOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BannerSection = () => {
    return (
        <section className="bg-[#f6f8fa] py-16 md:py-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
                <div className="flex-1 flex flex-col items-center md:items-start justify-center">
                    <h2 className="text-4xl! font-bold! text-gray-800 leading-tight text-center md:text-left">
                        Tìm kiếm ứng viên tài năng cho doanh nghiệp của bạn
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl text-center md:text-left">
                        Tiếp cận với hàng nghìn hồ sơ ứng viên chất lượng. Đăng tin tuyển dụng dễ dàng và nhận được phản hồi nhanh chóng từ các ứng viên phù hợp.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center md:justify-start">
                        <button className="bg-[#0096db] hover:bg-[#007bb8] text-white! font-bold px-8 py-3 rounded-xl text-lg flex items-center gap-2 shadow-md justify-center">
                            <span className="text-xl"><RocketOutlined /></span> Đăng ký doanh nghiệp
                        </button>
                        <button className="border-2 border-[#0096db] text-[#0096db]! hover:bg-[#e6f7ff] font-bold px-8 py-3 rounded-xl text-lg flex items-center gap-2 justify-center">
                            <span className="text-xl"><LoginOutlined /></span> Đăng nhập
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="/assets/hiring-banner.png" alt="Doanh nghiệp tuyển dụng" className="max-w-[420px] w-full drop-shadow-xl" />
                </div>
            </div>
        </section>
    )
}

export default BannerSection;