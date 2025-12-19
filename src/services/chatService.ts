import axiosCustom from '@/ultils/axios/axiosCustom';
import {
  IConversation,
  IMessage,
  ICreateConversation,
  ISendMessage,
  IGetMessages,
  IGetConversations,
  IMarkAsRead,
} from '@/types/chat/ChatType';
import { IPaginationResponse } from '@/types/base/IPaginationResponse';

class ChatService {
  async createOrGetConversation(data: ICreateConversation): Promise<IConversation> {
    const response = await axiosCustom.post<IConversation>('/chat/create-conversation', data);
    return response.data;
  }

  async sendMessage(data: ISendMessage): Promise<IMessage> {
    const response = await axiosCustom.post<IMessage>('/chat/send-message', data);
    return response.data;
  }

  async getMessages(data: IGetMessages): Promise<IPaginationResponse<IMessage>> {
    const response = await axiosCustom.post<IPaginationResponse<IMessage>>('/chat/get-messages', data);
    return response.data;
  }

  async getConversations(data: IGetConversations): Promise<IPaginationResponse<IConversation>> {
    const response = await axiosCustom.post<IPaginationResponse<IConversation>>('/chat/get-conversations', data);
    return response.data;
  }

  async markAsRead(data: IMarkAsRead): Promise<void> {
    await axiosCustom.post('/chat/mark-as-read', data);
  }

  async deleteConversation(conversationId: number, userId: number): Promise<void> {
    await axiosCustom.delete(`/chat/delete-conversation/${conversationId}/${userId}`);
  }
}

export default new ChatService();

