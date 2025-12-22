import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { IConversation, IMessage } from '@/types/chat/ChatType';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
    // Reset textarea height và focus lại sau khi gửi
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  }, [messageInput, onSendMessage]);

  const handleContainerClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, []);

  const handleEmojiClick = useCallback((emoji: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || messageInput.length;
    const newText = messageInput.slice(0, cursorPosition) + emoji + messageInput.slice(cursorPosition);
    setMessageInput(newText);
    
    // Focus và đặt cursor sau emoji vừa chèn
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPosition = cursorPosition + emoji.length;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        // Auto-resize
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
      }
    }, 0);
    
    setShowEmojiPicker(false);
  }, [messageInput]);

  const commonEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
    '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
    '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👏',
    '🙌', '👐', '🤲', '🤝', '🙏', '💪', '❤️', '💯'
  ];

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
      <div className="bg-white border-t border-gray-200 relative min-h-[60px] flex items-center" onClick={handleContainerClick}>
        <textarea
          ref={textareaRef}
          placeholder="Nhập tin nhắn... (Shift + Enter để xuống dòng)"
          value={messageInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onClick={(e) => e.stopPropagation()}
          rows={1}
          className="px-4 w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent resize-none overflow-y-auto"
          style={{ 
            paddingRight: messageInput.trim() ? '7rem' : '3.5rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            minHeight: '60px',
            maxHeight: '150px',
            lineHeight: '1.5'
          }}
        />

        {/* Emoji Button */}
        <div className="relative" ref={emojiPickerRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojiPicker(!showEmojiPicker);
            }}
            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors z-10 ${
              messageInput.trim() ? 'right-14' : 'right-6'
            }`}
          >
            <SmileOutlined className='text-gray-500! text-lg!'/>
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className={`absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64 max-h-48 overflow-y-auto z-20 ${
              messageInput.trim() ? 'right-14' : 'right-6'
            }`}>
              <div className="grid grid-cols-8 gap-1">
                {commonEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmojiClick(emoji);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 rounded transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {messageInput.trim() && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors z-10 cursor-pointer"
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

