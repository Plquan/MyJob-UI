import { createSlice } from '@reduxjs/toolkit';
import { IConversation, IMessage } from '@/types/chat/ChatType';
import {
  getConversationsThunk,
  getMessagesThunk,
  sendMessageThunk,
  createOrGetConversationThunk,
  markAsReadThunk,
  deleteConversationThunk,
  getUnreadCountThunk,
} from './chatThunk';

interface ChatState {
  conversations: IConversation[];
  messages: IMessage[];
  currentConversation: IConversation | null;
  totalConversations: number;
  totalMessages: number;
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
  currentConversation: null,
  totalConversations: 0,
  totalMessages: 0,
  unreadCount: 0,
  isLoading: false,
  error: null,
};

// Helper function to calculate total unread count from conversations
const calculateUnreadCount = (conversations: IConversation[]): number => {
  return conversations.reduce((total, conv) => {
    return total + (conv.unreadCount || 0);
  }, 0);
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentConversation = null;
    },
    addMessage: (state, action) => {
      const message = action.payload;
      // Kiểm tra xem message đã tồn tại chưa để tránh duplicate
      const messageExists = state.messages.some(msg => msg.id === message.id);
      if (!messageExists) {
        state.messages.push(message);
      }
    },
    incrementUnreadCount: (state) => {
      state.unreadCount = (state.unreadCount || 0) + 1;
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload || 0;
    },
  },
  extraReducers: (builder) => {
    // Get Conversations
    builder.addCase(getConversationsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getConversationsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conversations = action.payload?.items || [];
      state.totalConversations = action.payload?.totalItems || 0;
      // Tự động tính unreadCount từ conversations
      state.unreadCount = calculateUnreadCount(state.conversations);
    });
    builder.addCase(getConversationsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Get Messages
    builder.addCase(getMessagesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      // Backend đã reverse rồi nên không cần reverse nữa
      state.messages = action.payload?.items || [];
      state.totalMessages = action.payload?.totalItems || 0;
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Send Message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.error = null;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      const message = action.payload;
      // Kiểm tra xem message đã tồn tại chưa để tránh duplicate
      // (vì có thể đã được add qua socket trước đó)
      const messageExists = state.messages.some(msg => msg.id === message.id);
      if (!messageExists) {
        state.messages.push(message);
      }
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Create or Get Conversation
    builder.addCase(createOrGetConversationThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrGetConversationThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentConversation = action.payload;
    });
    builder.addCase(createOrGetConversationThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Mark as Read
    builder.addCase(markAsReadThunk.fulfilled, (state) => {
      if (state.currentConversation) {
        state.messages = state.messages.map((msg) =>
          msg.conversationId === state.currentConversation!.id && msg.senderId !== state.currentConversation!.user1Id
            ? { ...msg, isRead: true }
            : msg
        );
        // Cập nhật unreadCount của conversation hiện tại về 0
        const currentConv = state.conversations.find(conv => conv.id === state.currentConversation!.id);
        if (currentConv) {
          currentConv.unreadCount = 0;
          state.unreadCount = calculateUnreadCount(state.conversations);
        }
      }
    });

    // Delete Conversation
    builder.addCase(deleteConversationThunk.fulfilled, (state, action) => {
      state.conversations = state.conversations.filter((conv) => conv.id !== action.payload);
      if (state.currentConversation?.id === action.payload) {
        state.currentConversation = null;
        state.messages = [];
      }
      // Cập nhật unreadCount sau khi xóa conversation
      state.unreadCount = calculateUnreadCount(state.conversations);
    });

    // Get Unread Count
    builder.addCase(getUnreadCountThunk.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getUnreadCountThunk.fulfilled, (state, action) => {
      state.unreadCount = action.payload || 0;
    });
    builder.addCase(getUnreadCountThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      state.unreadCount = 0;
    });
  },
});

export const { setCurrentConversation, clearMessages, addMessage, incrementUnreadCount, setUnreadCount } = chatSlice.actions;
export default chatSlice.reducer;

