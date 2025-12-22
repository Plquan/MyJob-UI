import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { IConversation, IMessage } from '@/types/chat/ChatType';
import { SendOutlined } from '@ant-design/icons';
import MessageItem from './MessageItem';

interface ChatWindowProps {
  currentConversation: IConversation | null;
  messages: IMessage[];
  currentUserId?: number;
  onSendMessage: (content: string) => void;
}

const ChatWindow = memo(({
  currentConversation,
  messages,
  currentUserId,
  onSendMessage,
}: ChatWindowProps) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
    // Focus lại input sau khi gửi
    inputRef.current?.focus();
  }, [messageInput, onSendMessage]);

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const getOtherUser = (conversation: IConversation) => {
    return conversation.user1Id === currentUserId ? conversation.user2 : conversation.user1;
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-8xl mb-4">💬</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Chào mừng đến với MyJob Chat</h2>
          <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
        </div>
      </div>
    );
  }

  const otherUser = getOtherUser(currentConversation);
  const displayName = otherUser?.candidate?.fullName || otherUser?.company?.companyName || otherUser?.email || 'Unknown User';
  const avatarUrl = otherUser?.avatar?.url;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#154C91] flex items-center justify-center text-white font-semibold">
              {initial}
            </div>
          )}
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-500">Bắt đầu cuộc trò chuyện</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isMyMessage={message.senderId === currentUserId}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 relative min-h-[60px]" onClick={handleContainerClick}>
        <input
          ref={inputRef}
          placeholder="Nhập tin nhắn..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          onClick={(e) => e.stopPropagation()}
          className="px-4 py-2 absolute inset-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          style={{ paddingRight: messageInput.trim() ? '3.5rem' : '1rem' }}
        />

        {messageInput.trim() && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white rounded-full hover:bg-gray-200 transition-colors z-10"
          >
            <SendOutlined className='text-[#154C91]!'/>
          </button>
        )}
      </div>
    </div>
  );
});

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow;

