import type { IGetNotificationsRequest, IMarkAsReadRequest, INotificationsResponse } from "@/types/notification/NotificationType";
import http from "@/ultils/axios/axiosCustom";

class NotificationService {
  async getNotifications(params: IGetNotificationsRequest): Promise<INotificationsResponse> {
    const response = await http.get<INotificationsResponse>("/notifications", { params });
    return response as any;
  }

  async getUnreadCount(): Promise<{ count: number }> {
    const response = await http.get<{ count: number }>("/notifications/unread-count");
    return response as any;
  }

  async markAsRead(request: IMarkAsReadRequest): Promise<boolean> {
    const response = await http.put<boolean>("/notifications/mark-as-read", request);
    return response as any;
  }

  async markAllAsRead(): Promise<boolean> {
    const response = await http.put<boolean>("/notifications/mark-all-as-read");
    return response as any;
  }

  async deleteNotification(notificationId: number): Promise<boolean> {
    const response = await http.delete<boolean>(`/notifications/${notificationId}`);
    return response as any;
  }
}

export default new NotificationService();

