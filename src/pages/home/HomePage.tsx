import { useEffect, useState } from 'react';
import TrendingSection from "./components/TrendingSection";
import FeaturedCompanySection from "./components/FeaturedCompanySection";
import FeaturedJobsSection from "./components/FeaturedJobsSection";
import JobSearchBar from "./components/JobSearchBar";
import BannerSection from "./components/BannerSection";
import ScrollReveal from '../../components/ScrollReveal';


export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-[rgb(0,0,0)] to-[rgb(123,104,238)] pt-24 pb-16 text-center text-white">
        <h1 style={{ fontFamily: 'FZ Poppins', fontWeight: 900}} 
            className={`text-[80px] md:text-[60px] leading-tight text-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Tìm việc làm mơ ước
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            của bạn
          </span>
        </h1>

        <p className={`text-xl md:text-2xl mb-6 transition-all duration-1000 delay-200 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Hơn <span className="font-bold text-yellow-400 text-3xl">10,000</span> việc làm đang chờ đợi bạn
        </p>
        <div className={`flex flex-col md:flex-row justify-center gap-2 mb-6 transition-all duration-1000 delay-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

        <div className={`transition-all duration-1000 delay-400 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <JobSearchBar />
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <TrendingSection />
        </div>
      </section>

      <ScrollReveal delay={100}>
        <FeaturedCompanySection />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <FeaturedJobsSection />
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <BannerSection />
      </ScrollReveal>
    </>
  );
}