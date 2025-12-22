import { memo, useState, useRef, useCallback, useEffect } from 'react';
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
  const DEFAULT_WIDTH = 384;
  const MIN_WIDTH = 250;
  const MAX_WIDTH = 600;

  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem('conversationListWidth');
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  useEffect(() => {
    localStorage.setItem('conversationListWidth', width.toString());
  }, [width]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const diff = e.clientX - startXRef.current;
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidthRef.current + diff));
    setWidth(newWidth);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const getOtherUser = (conversation: IConversation) => {
    return conversation.user1Id === currentUserId ? conversation.user2 : conversation.user1;
  };

  const filteredConversations = conversations.filter((conv) => {
    const otherUser = getOtherUser(conv);
    const displayName = otherUser?.candidate?.fullName || otherUser?.company?.companyName || otherUser?.email || '';
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div 
      className="bg-white border-r border-gray-200 flex flex-col relative"
      style={{ width: `${width}px`, minWidth: `${MIN_WIDTH}px`, maxWidth: `${MAX_WIDTH}px` }}
    >
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0096db]"
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

      <div
        className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-[#0096db]/20 transition-colors group flex items-center justify-center"
        onMouseDown={handleMouseDown}
        style={{ zIndex: 10 }}
      >
      </div>
    </div>
  );
});

ConversationList.displayName = 'ConversationList';

export default ConversationList;

