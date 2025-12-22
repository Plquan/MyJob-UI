import { memo } from 'react';
import { IConversation } from '@/types/chat/ChatType';
import { formatTimeAgo } from '@/ultils/functions/formatTimeAgo';

interface ConversationItemProps {
  conversation: IConversation;
  isActive: boolean;
  otherUser: any;
  onClick: () => void;
}

const ConversationItem = memo(({ conversation, isActive, otherUser, onClick }: ConversationItemProps) => {
  const displayName = otherUser?.candidate?.fullName || otherUser?.company?.companyName || otherUser?.email || 'Unknown User';
  const avatarUrl = otherUser?.avatar?.url;
  const initial = displayName.charAt(0).toUpperCase();
  const unreadCount = conversation.unreadCount || 0;

  return (
    <div
      onClick={onClick}
      className={`flex items-start p-4 cursor-pointer transition-colors border-b border-gray-100 ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#154C91] flex items-center justify-center text-white font-semibold">
            {initial}
          </div>
        )}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm truncate ${unreadCount > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>
            {displayName}
          </h3>
          {conversation.lastMessageAt && (
            <span className="text-xs text-gray-500">
              {formatTimeAgo(conversation.lastMessageAt)}
            </span>
          )}
        </div>
        <p className={`text-sm truncate mt-1 ${unreadCount > 0 ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
          {conversation.lastMessage || 'Chưa có tin nhắn'}
        </p>
      </div>
    </div>
  );
});

ConversationItem.displayName = 'ConversationItem';

export default ConversationItem;

