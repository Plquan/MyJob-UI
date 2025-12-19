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
  return (
    <div
      onClick={onClick}
      className={`flex items-start p-4 cursor-pointer transition-colors border-b border-gray-100 ${
        isActive ? 'bg-purple-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {otherUser?.avatar?.fileUrl ? (
          <img
            src={otherUser.avatar.fileUrl}
            alt={otherUser.username}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            {otherUser?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {otherUser?.username || 'Unknown User'}
          </h3>
          {conversation.lastMessageAt && (
            <span className="text-xs text-gray-500">
              {formatTimeAgo(conversation.lastMessageAt)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {conversation.lastMessage || 'Chưa có tin nhắn'}
        </p>
      </div>
    </div>
  );
});

ConversationItem.displayName = 'ConversationItem';

export default ConversationItem;

