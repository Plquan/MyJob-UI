import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RocketIcon from '@mui/icons-material/Rocket';
import GroupIcon from '@mui/icons-material/Group';
import SakuraParticles from '../../../../components/SakuraParticles';
import { Button } from 'antd';
import ROUTE_PATH from '../../../../routes/routePath';
import { useNavigate } from 'react-router-dom';
const LeftSide = ({ mounted }: { mounted: boolean }) => {
    const navigate = useNavigate();
    const slideWelcome = mounted ? 'translate-x-0 opacity-100 transition-all duration-1000 ease-out' : '-translate-x-full opacity-0';
    
    return (
      <div
        className={"hidden md:flex flex-col justify-center items-center w-[40%] relative overflow-hidden " + slideWelcome}
        style={{
          background: 'linear-gradient(120deg,rgb(0, 0, 0) 0%,rgb(123,104,238) 100%)' 
        }}
      >
        {/* Overlay màu tím/xám trong suốt */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(20, 0, 40, 0.3)',
          zIndex: 2,
        }} />
        {/* Background logo image */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '350px',
            height: '350px',
            backgroundImage: 'url(/assets/vinhuni.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            animation: 'shakeLogo 5s infinite',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        />
        <style>{`
          @keyframes shakeLogo {
            0% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.8); }
            20% { transform: translate(-50%, -50%) rotate(5deg) scale(2); }
            40% { transform: translate(-50%, -50%) rotate(-3deg) scale(1.9); }
            60% { transform: translate(-50%, -50%) rotate(3deg) scale(2.1); }
            80% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.9); }
            100% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.8); }
          }
        `}</style>
        {/* Sakura Particles */}
        <SakuraParticles />
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-8">
          <h1 className="text-4xl font-bold text-gray-200 pb-1 pt-1 ">Chào mừng trở lại!</h1>
  
          <div className="w-full max-w-[420px] flex flex-col gap-3">

            <div className="bg-[rgba(120,120,130,0.18)] rounded-md py-6 px-6 mb-1 flex flex-col items-center transition-transform duration-600 hover:scale-108 hover:shadow-xl">
              <span className="text-3xl mb-2">
                <GroupIcon fontSize="large" sx={{ color: 'white' }} />
              </span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Quản lý tuyển dụng hiệu quả</div>
              <div className="text-gray-200 text-base text-center opacity-90">Tiếp cận ứng viên phù hợp nhanh chóng</div>
            </div>
  
            <div className="bg-[rgba(120,120,130,0.18)] rounded-md py-6 px-6 mb-1 flex flex-col items-center transition-transform duration-600 hover:scale-108 hover:shadow-xl">
              <span className="text-3xl mb-2"><RocketIcon fontSize="large" sx={{ color: 'white' }} /></span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Đăng tin dễ dàng</div>
              <div className="text-gray-200 text-base text-center opacity-90">Đăng tin tuyển dụng chỉ với vài bước</div>
            </div>
  
            <div className="bg-[rgba(120,120,130,0.18)] rounded-md mb-5 py-6 px-6 flex flex-col items-center transition-transform duration-600 hover:scale-108 hover:shadow-xl">
              <span className="text-3xl mb-2"><VerifiedUserIcon fontSize="large" sx={{ color: 'white' }} /></span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Bảo mật thông tin</div>
              <div className="text-gray-200 text-base text-center opacity-90">Thông tin của bạn luôn được bảo vệ</div>
            </div>          
            <Button
              onClick={() => navigate(ROUTE_PATH.HOME)}
              type="primary"
              className="mt-8 flex items-center justify-center font-bold px-6 py-4 rounded-md hover:opacity-90 hover:scale-110 transition-transform duration-300 relative overflow-hidden button-flash"
              style={{
                background: 'rgba(40, 0, 80, 0.6)',
                border: '1px solid white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                color: 'white',
                height: '50px',
                width: '200px',
                fontWeight: 'bold',
              }}
            >
              <span>← Quay về trang chủ</span>
              <span className="absolute inset-0 bg-gray-600 opacity-0 hover:opacity-40 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

export default LeftSide