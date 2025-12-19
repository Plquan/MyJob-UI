import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import {
  getConversationsThunk,
  getMessagesThunk,
  sendMessageThunk,
  markAsReadThunk,
} from '@/stores/chatStore/chatThunk';
import { setCurrentConversation } from '@/stores/chatStore/chatReducer';
import { IConversation } from '@/types/chat/ChatType';
import ChatHeader from './components/ChatHeader';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

const ChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, messages, currentConversation, isLoading } = useSelector(
    (state: RootState) => state.chatStore
  );
  const { currentUser } = useSelector((state: RootState) => state.authStore);
  const user = currentUser;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.id) {
      dispatch(getConversationsThunk({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (currentConversation?.id) {
      dispatch(getMessagesThunk({ conversationId: currentConversation.id }));
      dispatch(markAsReadThunk({ conversationId: currentConversation.id, userId: user?.id || 0 }));
    }
  }, [currentConversation?.id, dispatch, user?.id]);

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
  }, [currentConversation, user?.id, dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

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
    </div>
  );
};

export default ChatPage;
