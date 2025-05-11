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
              background: 'linear-gradient(120deg, #d8bfd8 70%, #e6b0fa 100%)',
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
  
  export default SakuraParticles;