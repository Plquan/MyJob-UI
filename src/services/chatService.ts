import axiosCustom from '@/ultils/axios/axiosCustom';
import {
  IConversation,
  IMessage,
  ICreateConversation,
  ISendMessage,
  IGetMessages,
  IGetConversations,
  IMarkAsRead,
  IGetUnreadCount,
} from '@/types/chat/ChatType';
import { IPaginationResponse } from '@/types/base/IPaginationResponse';

class ChatService {
  async createOrGetConversation(data: ICreateConversation): Promise<IConversation> {
    const response = await axiosCustom.post<IConversation>('/chat/create-conversation', data);
    return response as any; // Interceptor đã unwrap response.data
  }

  async sendMessage(data: ISendMessage): Promise<IMessage> {
    const response = await axiosCustom.post<IMessage>('/chat/send-message', data);
    return response as any;
  }

  async getMessages(data: IGetMessages): Promise<IPaginationResponse<IMessage>> {
    const response = await axiosCustom.post<IPaginationResponse<IMessage>>('/chat/get-messages', data);
    return response as any;
  }

  async getConversations(data: IGetConversations): Promise<IPaginationResponse<IConversation>> {
    const response = await axiosCustom.post<IPaginationResponse<IConversation>>('/chat/get-conversations', data);
    return response as any;
  }

  async markAsRead(data: IMarkAsRead): Promise<void> {
    await axiosCustom.post('/chat/mark-as-read', data);
  }

  async deleteConversation(conversationId: number, userId: number): Promise<void> {
    await axiosCustom.delete(`/chat/delete-conversation/${conversationId}/${userId}`);
  }

  async getUnreadCount(data: IGetUnreadCount): Promise<number> {
    const response = await axiosCustom.post<{ count: number }>('/chat/get-unread-count', data);
    console.log('🔍 API unread count response:', response);
    // Handle both { count: number } and direct number response
    const count = (response as any)?.count ?? (response as any) ?? 0;
    return typeof count === 'number' ? count : 0;
  }
}

export default new ChatService();

