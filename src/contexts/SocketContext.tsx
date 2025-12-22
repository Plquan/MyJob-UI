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

  useEffect(() => {
    console.log('🔍 Socket init - accessToken:', !!accessToken, 'currentUser:', !!currentUser, 'isAuthenticated:', isAuthenticated);
    
    if (!accessToken || !currentUser || !isAuthenticated) {
      // Nếu không có token hoặc user, disconnect socket
      console.log('⚠️ No token or user, skipping socket connection');
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Keep socket URL consistent with axios baseURL (env.API_URL usually ends with `/api`)
    const socketUrl = String(env.API_URL).replace(/\/api\/?$/, '');
    console.log('🔌 Connecting to socket:', socketUrl);
    
    // Khởi tạo socket connection
    const newSocket = io(socketUrl, {
      auth: {
        token: accessToken,
      },
      // Prefer polling first; if websocket is blocked/unavailable it will still work via polling
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🔴 Socket connection error:', error.message);
      setIsConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('🔴 Socket error:', error);
    });

    setSocket(newSocket);

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up socket connection');
      newSocket.disconnect();
    };
  }, [currentUser?.id, isAuthenticated, accessToken]); // include token so we reconnect when it appears

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

