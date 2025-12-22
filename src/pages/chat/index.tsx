import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import {
  getConversationsThunk,
  getMessagesThunk,
  sendMessageThunk,
  markAsReadThunk,
  getUnreadCountThunk,
} from '@/stores/chatStore/chatThunk';
import { setCurrentConversation, addMessage } from '@/stores/chatStore/chatReducer';
import { IConversation } from '@/types/chat/ChatType';
import ChatHeader from './components/ChatHeader';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { useChat } from '@/hooks/useChat';
import { message as antdMessage } from 'antd';

const ChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, messages, currentConversation, isLoading } = useSelector(
    (state: RootState) => state.chatStore
  );
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const user = currentUser;
  const [searchQuery, setSearchQuery] = useState('');
  const isInitialMount = useRef(true);
  const previousConversationId = useRef<number | null>(null);

  // Initialize socket chat hooks
  const { 
    isConnected, 
    onNewMessage, 
    onNewConversationMessage,
  } = useChat(currentConversation?.id || null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getConversationsThunk({ userId: user.id }));
      dispatch(getUnreadCountThunk({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (currentConversation?.id) {
      dispatch(getMessagesThunk({ conversationId: currentConversation.id }));
      dispatch(markAsReadThunk({ conversationId: currentConversation.id, userId: user?.id || 0 }));
      
      // Chỉ refresh unread count khi conversation thực sự thay đổi (không phải lần mount đầu)
      const conversationChanged = previousConversationId.current !== currentConversation.id;
      if (user?.id && conversationChanged && !isInitialMount.current) {
        setTimeout(() => {
          dispatch(getUnreadCountThunk({ userId: user.id }));
        }, 500);
      }
      
      previousConversationId.current = currentConversation.id;
    }
    
    // Đánh dấu đã mount xong
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [currentConversation?.id, dispatch, user?.id]);

  // Listen for new messages in current conversation
  useEffect(() => {
    const cleanup = onNewMessage((message: any) => {
      // Only add message if it's in the current conversation and not from current user
      if (message.conversationId === currentConversation?.id && message.senderId !== user?.id) {
        dispatch(addMessage(message));
        // Refresh conversations to update last message
        if (user?.id) {
          dispatch(getConversationsThunk({ userId: user.id }));
        }
      } else if (message.senderId !== user?.id) {
        // Message from other conversation - update unread count
        if (user?.id) {
          dispatch(getUnreadCountThunk({ userId: user.id }));
        }
      }
    });

    return cleanup;
  }, [onNewMessage, currentConversation?.id, user?.id, dispatch]);

  // Listen for new messages in other conversations (for notifications)
  useEffect(() => {
    const cleanup = onNewConversationMessage((data) => {
      // Show notification if message is not in current conversation
      if (data.conversationId !== currentConversation?.id) {
        antdMessage.info('Bạn có tin nhắn mới!');
        
        // Refresh conversations list and unread count
        if (user?.id) {
          dispatch(getConversationsThunk({ userId: user.id }));
          dispatch(getUnreadCountThunk({ userId: user.id }));
        }
      }
    });

    return cleanup;
  }, [onNewConversationMessage, currentConversation?.id, user?.id, dispatch]);

  const handleSelectConversation = useCallback((conversation: IConversation) => {
    dispatch(setCurrentConversation(conversation));
  }, [dispatch]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!currentConversation || !user?.id) return;

    await dispatch(
      sendMessageThunk({
        conversationId: currentConversation.id,
        senderId: user.id,
        content,
      })
    );
    
    // Refresh conversations to update last message
    dispatch(getConversationsThunk({ userId: user.id }));
    // Refresh unread count (in case we sent to a conversation with unread messages)
    dispatch(getUnreadCountThunk({ userId: user.id }));
  }, [currentConversation, user?.id, dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);


  // Log socket connection status for debugging
  console.log('Socket connected:', isConnected);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />

      <div className="flex flex-1 overflow-hidden">
        <ConversationList
          conversations={conversations}
          currentConversation={currentConversation}
          isLoading={isLoading}
          searchQuery={searchQuery}
          currentUserId={user?.id}
          onSearchChange={handleSearchChange}
          onSelectConversation={handleSelectConversation}
        />

        <ChatWindow
          currentConversation={currentConversation}
          messages={messages}
          currentUserId={user?.id}
          onSendMessage={handleSendMessage}
        />
      </div>
      
      {/* Optional: You can add typing indicator or connection status UI here */}
      {/* Example: */}
      {/* {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 px-4 py-2 rounded">
          Đang kết nối...
        </div>
      )} */}
    </div>
  );
};

export default ChatPage;
