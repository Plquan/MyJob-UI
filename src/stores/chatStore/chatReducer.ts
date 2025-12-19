import { createSlice } from '@reduxjs/toolkit';
import { IConversation, IMessage } from '@/types/chat/ChatType';
import {
  getConversationsThunk,
  getMessagesThunk,
  sendMessageThunk,
  createOrGetConversationThunk,
  markAsReadThunk,
  deleteConversationThunk,
} from './chatThunk';

interface ChatState {
  conversations: IConversation[];
  messages: IMessage[];
  currentConversation: IConversation | null;
  totalConversations: number;
  totalMessages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
  currentConversation: null,
  totalConversations: 0,
  totalMessages: 0,
  isLoading: false,
  error: null,
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
      state.messages.unshift(action.payload);
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
      state.conversations = action.payload.items;
      state.totalConversations = action.payload.totalItems;
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
      state.messages = action.payload.items.reverse();
      state.totalMessages = action.payload.totalItems;
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
      state.messages.push(action.payload);
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
      }
    });

    // Delete Conversation
    builder.addCase(deleteConversationThunk.fulfilled, (state, action) => {
      state.conversations = state.conversations.filter((conv) => conv.id !== action.payload);
      if (state.currentConversation?.id === action.payload) {
        state.currentConversation = null;
        state.messages = [];
      }
    });
  },
});

export const { setCurrentConversation, clearMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;

