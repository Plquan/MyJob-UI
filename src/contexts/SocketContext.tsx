import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import env from '@/constant/env';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.authStore);
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));

  // Sync accessToken from localStorage (handles cases where token is set later via refresh-token flow)
  useEffect(() => {
    if (!isAuthenticated) {
      setAccessToken(null);
      return;
    }

    // Update immediately once
    setAccessToken(localStorage.getItem('accessToken'));

    // Poll briefly to catch async token updates in the same tab
    const intervalId = window.setInterval(() => {
      const next = localStorage.getItem('accessToken');
      setAccessToken((prev) => (prev === next ? prev : next));
    }, 500);

    return () => window.clearInterval(intervalId);
  }, [isAuthenticated]);

  // Kết nối socket ngay khi app khởi động, không cần đợi token
  useEffect(() => {
    // Nếu đã có socket, chỉ cập nhật auth token nếu có
    if (socket) {
      if (accessToken && isAuthenticated) {
        // Cập nhật auth token cho socket hiện tại
        socket.auth = { token: accessToken };
        // Nếu chưa kết nối, reconnect với token mới
        if (!socket.connected) {
          socket.connect();
        }
      }
      return;
    }

    // Keep socket URL consistent with axios baseURL (env.API_URL usually ends with `/api`)
    const socketUrl = String(env.API_URL).replace(/\/api\/?$/, '');
    console.log('🔌 Connecting to socket:', socketUrl);
    
    // Khởi tạo socket connection ngay lập tức, không cần đợi token
    const newSocket = io(socketUrl, {
      auth: accessToken ? { token: accessToken } : {},
      // Prefer polling first; if websocket is blocked/unavailable it will still work via polling
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity, // Không bao giờ ngừng reconnect
      timeout: 20000,
      forceNew: false,
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      // Tự động reconnect nếu bị ngắt kết nối
      if (reason === 'io server disconnect') {
        // Server đã ngắt kết nối, cần reconnect thủ công
        newSocket.connect();
      }
      // Các trường hợp khác sẽ tự động reconnect nhờ cấu hình reconnection: true
    });

    newSocket.on('connect_error', (error) => {
      console.error('🔴 Socket connection error:', error.message);
      setIsConnected(false);
      // Tiếp tục thử kết nối lại (đã được cấu hình tự động)
    });

    newSocket.on('error', (error) => {
      console.error('🔴 Socket error:', error);
    });

    // Reconnect event
    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      setIsConnected(true);
    });

    // Reconnecting event
    newSocket.on('reconnecting', (attemptNumber) => {
      console.log('🔄 Socket reconnecting... attempt', attemptNumber);
    });

    // Reconnect error
    newSocket.on('reconnect_error', (error) => {
      console.error('🔴 Socket reconnect error:', error);
    });

    // Reconnect failed (sẽ không xảy ra vì reconnectionAttempts = Infinity)
    newSocket.on('reconnect_failed', () => {
      console.error('🔴 Socket reconnect failed - but will keep trying');
    });

    setSocket(newSocket);

    // KHÔNG cleanup - giữ socket luôn kết nối
    // Chỉ cleanup khi component unmount hoàn toàn
    return () => {
      // Chỉ disconnect khi component thực sự unmount
      console.log('🧹 App unmounting - cleaning up socket connection');
      newSocket.disconnect();
    };
  }, []); // Chỉ chạy một lần khi mount

  // Cập nhật auth token khi có token mới
  useEffect(() => {
    if (socket && accessToken && isAuthenticated) {
      socket.auth = { token: accessToken };
      // Nếu chưa kết nối, thử kết nối lại với token mới
      if (!socket.connected) {
        socket.connect();
      }
    }
  }, [socket, accessToken, isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

