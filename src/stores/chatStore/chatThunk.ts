import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '@/services/chatService';
import {
  ICreateConversation,
  ISendMessage,
  IGetMessages,
  IGetConversations,
  IMarkAsRead,
} from '@/types/chat/ChatType';

export const getConversationsThunk = createAsyncThunk(
  'chat/getConversations',
  async (data: IGetConversations, { rejectWithValue }) => {
    try {
      const response = await chatService.getConversations(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get conversations');
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  'chat/getMessages',
  async (data: IGetMessages, { rejectWithValue }) => {
    try {
      const response = await chatService.getMessages(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get messages');
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async (data: ISendMessage, { rejectWithValue }) => {
    try {
      const response = await chatService.sendMessage(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const createOrGetConversationThunk = createAsyncThunk(
  'chat/createOrGetConversation',
  async (data: ICreateConversation, { rejectWithValue }) => {
    try {
      const response = await chatService.createOrGetConversation(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create conversation');
    }
  }
);

export const markAsReadThunk = createAsyncThunk(
  'chat/markAsRead',
  async (data: IMarkAsRead, { rejectWithValue }) => {
    try {
      await chatService.markAsRead(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
    }
  }
);

export const deleteConversationThunk = createAsyncThunk(
  'chat/deleteConversation',
  async ({ conversationId, userId }: { conversationId: number; userId: number }, { rejectWithValue }) => {
    try {
      await chatService.deleteConversation(conversationId, userId);
      return conversationId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete conversation');
    }
  }
);

