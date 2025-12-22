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
  const onNewMessage = useCallback((callback: (message: any) => void) => {
    if (!socket) return () => {};

    const handler = (message: any) => {
      console.log('💬 New message received:', message);
      callback(message);
    };

    socket.on('chat:new-message', handler);

    return () => {
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

