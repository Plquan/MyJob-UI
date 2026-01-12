import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./stores";
import { provinceActions } from "./stores/provinceStore/provinceReducer";
import { useEffect, useRef } from "react";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';
import { careerActions } from "./stores/careerStore/careerReducer";
import { LanguageProvider } from "./provider/Languages";
import { getUnreadCountThunk } from "./stores/chatStore/chatThunk";
import { useSocket } from "./contexts/SocketContext";
import { incrementUnreadCount } from "./stores/chatStore/chatReducer";
import toast from 'react-hot-toast';
import { MessageOutlined } from '@ant-design/icons';
import { notification } from "antd";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.authStore);
  const { socket, isConnected } = useSocket();
  const { currentConversation } = useSelector((state: RootState) => state.chatStore);
  const currentConversationRef = useRef<number | null>(null);

  useEffect(() => {
    currentConversationRef.current = currentConversation?.id || null;
  }, [currentConversation?.id]);

  useEffect(() => {
    dispatch(provinceActions.getAllProvinces());
    dispatch(careerActions.getAllCareers())
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      dispatch(getUnreadCountThunk({ userId: currentUser.id }));
    }
  }, [dispatch, isAuthenticated, currentUser?.id]);


  useEffect(() => {
    if (!socket || !isConnected || !currentUser?.id) {
      console.log('⚠️ [App.tsx] Socket listener not ready:', { socket: !!socket, isConnected, currentUser: !!currentUser?.id });
      return;
    }

    const handleNewMessage = (message: any) => {
      if (message.senderId === currentUser.id) {
        return;
      }

      const currentConvId = currentConversationRef.current;
      if (message.conversationId !== currentConvId) {
        dispatch(incrementUnreadCount());
        dispatch(getUnreadCountThunk({ userId: currentUser.id }));

        const senderName = message.sender?.candidate?.fullName ||
          message.sender?.company?.companyName ||
          message.sender?.email ||
          'Ai đó';
        notification.success({
          message: senderName,
          description: message.content?.substring(0, 20),
          placement: 'bottomRight',
          icon: <MessageOutlined style={{ color: '#3b82f6' }} />,
          duration: 4,
        });
      }
    };

    socket.on('chat:new-message', handleNewMessage);
    console.log('👂 [App.tsx] Global socket listener registered for chat:new-message (persistent)');

    return () => {
      console.log('🧹 [App.tsx] Cleaning up global socket listener (only on unmount or socket change)');
      socket.off('chat:new-message', handleNewMessage);
    };
  }, [socket, isConnected, currentUser?.id, dispatch]);

  return (
    <LanguageProvider>
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: { fontSize: '13px' },
          duration: 1500,
        }}
      />
    </LanguageProvider>
  );
}
