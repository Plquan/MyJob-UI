import { Carousel } from 'antd';

export default function TrendingSection() {
  // Dữ liệu cho các card
  const trendingData = [
    { label: 'AWS Cloud', icon: '☁️' },
    { label: 'API Developer', icon: '🔗' },
    { label: 'SQL Database', icon: '🗄️' },
    { label: 'AI Engineer', icon: '🧠' },
    { label: 'Security Expert', icon: '🛡️' },
    { label: 'Mobile Dev', icon: '📱' },
    { label: 'Data Science', icon: '📊', highlight: true },
    { label: 'DevOps', icon: '⚙️' },
    { label: 'React.js', icon: '⚛️' },
    { label: 'UI/UX', icon: '🎨' },
    { label: 'Python', icon: '🐍' },
    { label: 'Node.js', icon: '🟢' },
    { label: 'Blockchain', icon: '⛓️' },
    { label: 'JavaScript', icon: '🟡' },
    { label: 'Docker', icon: '🐳' },
    { label: 'Big Data', icon: '📈', highlight: true },
  ];

  const itemsPerSlide = 8;
  const slides = [];
  
  for (let i = 0; i < trendingData.length; i += itemsPerSlide) {
    slides.push(trendingData.slice(i, i + itemsPerSlide));
  }

  return (
<section className="bg-gradient-to-r py-16 px-4">
  <div className="relative max-w-6xl mx-auto rounded-2xl border border-white/20 p-6 md:p-8 bg-white/5 backdrop-blur-md">

    <h2 className="relative z-10 text-white text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
      <span className="text-yellow-400 text-2xl">🔥</span>
      XU HƯỚNG TUYỂN DỤNG NỔI BẬT
    </h2>

    <Carousel autoplay autoplaySpeed={1300} infinite dots={true} swipeToSlide>
      {slides.map((slide, slideIndex) => (
        <div key={`slide-${slideIndex}`}>
          <div className="relative z-10 flex flex-wrap gap-4 justify-center text-white mb-10 mt-7">
            {slide.map(({ label, icon, highlight }) => (
                <span
                key={label}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm md:text-base font-medium border border-white/20 transition-all 
                    ${highlight ? 'bg-gradient-to-r from-[#3b82f6] to-[#9333ea] relative' : 'bg-white/10'}
                    transform transition-transform duration-300 hover:scale-110`}
                >
                <span>{icon}</span>
                <span>{label}</span>
                </span>

            ))}
          </div>
        </div>
      ))}
    </Carousel>
  </div>
</section>

  );
}