import { memo } from 'react';
import { IConversation } from '@/types/chat/ChatType';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: IConversation[];
  currentConversation: IConversation | null;
  isLoading: boolean;
  searchQuery: string;
  currentUserId?: number;
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversation: IConversation) => void;
}

const ConversationList = memo(({
  conversations,
  currentConversation,
  isLoading,
  searchQuery,
  currentUserId,
  onSearchChange,
  onSelectConversation,
}: ConversationListProps) => {
  const getOtherUser = (conversation: IConversation) => {
    return conversation.user1Id === currentUserId ? conversation.user2 : conversation.user1;
  };

  const filteredConversations = conversations.filter((conv) => {
    const otherUser = getOtherUser(conv);
    return otherUser?.username?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && !conversations.length ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Đang tải...</div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Chưa có cuộc trò chuyện nào</div>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={currentConversation?.id === conversation.id}
              otherUser={getOtherUser(conversation)}
              onClick={() => onSelectConversation(conversation)}
            />
          ))
        )}
      </div>
    </div>
  );
});

ConversationList.displayName = 'ConversationList';

export default ConversationList;

