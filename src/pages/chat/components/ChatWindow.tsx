import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { IConversation, IMessage } from '@/types/chat/ChatType';
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
  }, [messageInput, onSendMessage]);

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

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          {otherUser?.avatar?.fileUrl ? (
            <img
              src={otherUser.avatar.fileUrl}
              alt={otherUser.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              {otherUser?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {otherUser?.username || 'Unknown User'}
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
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
});

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow;

