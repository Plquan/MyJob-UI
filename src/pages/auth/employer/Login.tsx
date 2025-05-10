import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

// Sakura (cherry blossom) petal particles - continuous natural fall, starting from top-left corner
const SakuraParticles = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(40)].map((_, i) => {
      const isDiagonal = i < 8; // 8/40 = 20%
      let startLeft, startTop, burstX, burstY, endX, endY, burstRotate, fallX, fallRotate;
      const size = 3 + Math.random() * 4.5;
      const duration = 2.2 + Math.random() * 2.5;
      const rotateStart = Math.random() * 360;
      if (isDiagonal) {
        startLeft = '-60px';
        startTop = '-60px';
        burstX = Math.random() * 40;
        burstY = 120 + Math.random() * 80;
        burstRotate = rotateStart + 20;
        fallX = burstX / window.innerWidth * 100;
        fallRotate = Math.random() * 360 + 180;
        endX = burstX;
        endY = burstY;
      } else {
        startLeft = 0;
        startTop = 0;
        const angle = Math.random() * (Math.PI / 2);
        const distance = 80 + Math.random() * 80;
        endX = Math.cos(angle) * distance;
        endY = Math.sin(angle) * distance;
        burstRotate = rotateStart + 30;
        fallX = Math.random() * 60 + 10;
        fallRotate = Math.random() * 360 + 180;
      }
      return (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: isDiagonal ? startLeft : `${startLeft}px`,
            top: isDiagonal ? startTop : `${startTop}px`,
            width: `${size}px`,
            height: `${size * 0.8}px`,
            borderRadius: '50% 50% 60% 40%/60% 40% 50% 50%',
            background: 'linear-gradient(120deg, #d8bfd8 70%, #e6b0fa 100%)', // Adjusted petal color to a muted purple tone
            boxShadow: '0 0 6px 1px #4B008255',
            opacity: 0.6,
            transform: `rotate(${rotateStart}deg)`,
            animation: `sakuraBurstFall${i} ${duration}s linear 0s infinite`,
            pointerEvents: 'none',
          }}
        />
      );
    })}
    <style>{`
      ${[...Array(40)].map((_, i) => {
        const isDiagonal = i < 8;
        let burstX, burstY, burstRotate, fallX, fallRotate, endX, endY;
        const rotateStart = Math.random() * 360;
        if (isDiagonal) {
          burstX = Math.random() * 40;
          burstY = 120 + Math.random() * 80;
          burstRotate = rotateStart + 20;
          fallX = burstX / window.innerWidth * 100;
          fallRotate = Math.random() * 360 + 180;
          endX = burstX;
          endY = burstY;
          return `
            @keyframes sakuraBurstFall${i} {
              0% {
                transform: translate(-60px, -60px) rotate(0deg) scale(0.5);
                opacity: 0;
              }
              10% {
                opacity: 0.9;
              }
              30% {
                transform: translate(${burstX}px, ${burstY}px) rotate(${burstRotate}deg) scale(1);
                opacity: 0.85;
              }
              35% {
                opacity: 0.8;
              }
              100% {
                transform: translateX(${fallX}vw) translateY(100vh) rotate(${fallRotate}deg) scale(1.05);
                opacity: 0.1;
              }
            }
          `;
        } else {
          const angle = Math.random() * (Math.PI / 2);
          const distance = 80 + Math.random() * 80;
          endX = Math.cos(angle) * distance;
          endY = Math.sin(angle) * distance;
          burstRotate = rotateStart + 30;
          fallX = Math.random() * 60 + 10;
          fallRotate = Math.random() * 360 + 180;
          return `
            @keyframes sakuraBurstFall${i} {
              0% {
                transform: translate(-60px, -60px) rotate(0deg) scale(0.5);
                opacity: 0;
              }
              10% {
                opacity: 0.9;
              }
              30% {
                transform: translate(${endX}px, ${endY}px) rotate(${burstRotate}deg) scale(1);
                opacity: 0.85;
              }
              35% {
                opacity: 0.8;
              }
              100% {
                transform: translateX(${fallX}vw) translateY(100vh) rotate(${fallRotate}deg) scale(1.05);
                opacity: 0.1;
              }
            }
          `;
        }
      }).join('')}
    `}</style>
  </div>
);

const Login = () => {
  const [form] = Form.useForm();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const fadeWelcome = mounted ? 'opacity-500 transition-opacity duration-1000 ease-in' : 'opacity-0';
  const slideLogin = mounted ? 'translate-y-0 opacity-100 transition-all duration-600 ease-out' : 'translate-y-80 opacity-0';

  return (
    <div className="flex h-screen w-full" style={{
      background: 'linear-gradient(120deg,rgb(0, 0, 0) 0%,rgb(87, 6, 146) 100%)' 
    }}>
      {/* Left side: Welcome & Features */}
      <div
        className={"hidden md:flex flex-col justify-center items-center w-[40%] relative overflow-hidden " + fadeWelcome}
        style={{
          background: 'linear-gradient(120deg,rgb(0, 0, 0) 0%,rgb(94, 8, 156) 100%)' 
        }}
      >
        {/* Overlay màu tím/xám trong suốt */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(20, 0, 40, 0.3)', // Darker overlay to match the theme
          zIndex: 2,
        }} />
        {/* Background logo image */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05, 
          backgroundImage: 'url(/assets/vinhuni.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          transform: 'scale(1.05) rotate(3.45deg)'
        }} />
        {/* Sakura Particles */}
        <SakuraParticles />
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-8" >
          <h1 className="text-4xl font-bold text-gray-200 ">Chào mừng trở lại!</h1>

          <div className="w-full max-w-[400px] flex flex-col gap-6">
            <div className="bg-[rgba(120,120,130,0.18)] rounded-xl py-6 px-6 mb-2 flex flex-col items-center transition-transform duration-200 hover:scale-105">
              <span className="text-3xl mb-2">👤</span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Quản lý tuyển dụng hiệu quả</div>
              <div className="text-gray-200 text-base text-center opacity-90">Tiếp cận ứng viên phù hợp nhanh chóng</div>
            </div>

            <div className="bg-[rgba(120,120,130,0.18)] rounded-xl py-6 px-6 mb-2 flex flex-col items-center transition-transform duration-200 hover:scale-105">
              <span className="text-3xl mb-2">🚀</span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Đăng tin dễ dàng</div>
              <div className="text-gray-200 text-base text-center opacity-90">Đăng tin tuyển dụng chỉ với vài bước</div>
            </div>

            <div className="bg-[rgba(120,120,130,0.18)] rounded-xl py-6 px-6 flex flex-col items-center transition-transform duration-200 hover:scale-105">
              <span className="text-3xl mb-2">✅</span>
              <div className="text-2xl font-semibold text-gray-100 mb-1 text-center">Bảo mật thông tin</div>
              <div className="text-gray-200 text-base text-center opacity-90">Thông tin của bạn luôn được bảo vệ</div>
            </div>
            
            <div className='pt-2 bg-transparent hover:bg-gray-100 text-black '>                
            <Button className="">
          ← Quay về trang chủ
               </Button>
            </div>

          </div>

        </div>
      </div>
      {/* Right side: Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className={"w-full max-w-[480px] rounded-2xl flex flex-col items-center py-8 px-6 " + slideLogin}
          style={{
            background: '#fff',
            boxShadow: '0 4px 32px 0 rgba(20, 0, 40, 0.2)', // Darker shadow to match theme
            borderRadius: '20px'
          }}
        >
          <h2 className="text-center text-3xl font-bold mb-6">Đăng nhập</h2>
          <div className="w-full max-w-[400px]">
            <Form
              form={form}
              layout="vertical"
              name="login-employer"
            >
              <Form.Item
                name="email"
                label={<span className="flex items-center"><span className="text-red-500 mr-1">*</span><span className="font-medium">Email</span></span>}
                style={{ marginBottom: 18 }}
              >
                <Input placeholder="Nhập email của bạn" className="rounded-md h-11" />
              </Form.Item>
              <Form.Item
                name="password"
                label={<span className="flex items-center"><span className="text-red-500 mr-1">*</span><span className="font-medium">Mật khẩu</span></span>}
                style={{ marginBottom: 24 }}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  className="rounded-md h-11"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 16 }}>
                <Button type="primary" htmlType="submit" className="w-full h-11 rounded-xl text-base font-medium" style={{ 
                  background: 'linear-gradient(90deg, #1a1a1a 0%, #4B0082 100%)', // Matching button gradient
                  border: 'none',
                  color: '#fff',
                }}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center text-sm mt-2 mb-2">
              <a href="#" className="text-gray-500 hover:underline">Quên mật khẩu?</a>
            </div>
            <div className="text-center text-sm">
              Chưa có tài khoản? <a href="#" className="text-[#8a2be2] font-semibold hover:underline">Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
