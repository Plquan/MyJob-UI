import { useEffect, useCallback } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores';

/**
 * Custom hook để xử lý Socket.io events cho chat
 */
export const useChat = (conversationId: number | null) => {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  // Join/Leave conversation room
  useEffect(() => {
    if (socket && isConnected && conversationId) {
      console.log(`📥 Joining conversation ${conversationId}`);
      socket.emit('chat:join-conversation', conversationId);

      return () => {
        console.log(`📤 Leaving conversation ${conversationId}`);
        socket.emit('chat:leave-conversation', conversationId);
      };
    }
  }, [socket, isConnected, conversationId]);

  // Listen for new messages in current conversation
  // Note: Không remove listener khi cleanup vì App.tsx cũng cần listener này
  // Chỉ remove khi socket thay đổi hoặc component unmount hoàn toàn
  const onNewMessage = useCallback((callback: (message: any) => void) => {
    if (!socket) return () => {};

    const handler = (message: any) => {
      console.log('💬 New message received in chat page:', message);
      callback(message);
    };

    // Sử dụng once hoặc đảm bảo không conflict với App.tsx listener
    // App.tsx sẽ handle tất cả messages, chat page chỉ filter và xử lý message trong conversation đang mở
    socket.on('chat:new-message', handler);

    return () => {
      // Chỉ remove handler này, không ảnh hưởng đến App.tsx listener
      socket.off('chat:new-message', handler);
    };
  }, [socket]);

  // Listen for new messages in other conversations (notifications)
  const onNewConversationMessage = useCallback((callback: (data: { conversationId: number; message: any }) => void) => {
    if (!socket) return () => {};

    const handler = (data: { conversationId: number; message: any }) => {
      console.log('🔔 New conversation message:', data);
      callback(data);
    };

    socket.on('chat:new-conversation-message', handler);

    return () => {
      socket.off('chat:new-conversation-message', handler);
    };
  }, [socket]);

  return {
    isConnected,
    onNewMessage,
    onNewConversationMessage,
  };
};

