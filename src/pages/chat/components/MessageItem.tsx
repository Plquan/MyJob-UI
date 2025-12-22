import { memo } from 'react';
import { IMessage } from '@/types/chat/ChatType';
import { formatTime } from '@/ultils/functions/formatTimeAgo';

interface MessageItemProps {
  message: IMessage;
  isMyMessage: boolean;
}

const MessageItem = memo(({ message, isMyMessage }: MessageItemProps) => {
  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
          isMyMessage
            ? 'bg-[#154C91] text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        <p className="text-sm break-words">{message.content}</p>
        <span
          className={`text-xs mt-1 block ${
            isMyMessage ? 'text-white' : 'text-gray-500'
          }`}
        >
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
});

MessageItem.displayName = 'MessageItem';

export default MessageItem;

