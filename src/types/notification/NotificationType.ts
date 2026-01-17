export enum NotificationType {
  JOB_POST_APPROVED = "JOB_POST_APPROVED",
  JOB_POST_REJECTED = "JOB_POST_REJECTED",
  APPLICATION_STATUS_CHANGED = "APPLICATION_STATUS_CHANGED",
  NEW_APPLICATION = "NEW_APPLICATION",
}

export interface INotification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: any;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetNotificationsRequest {
  page: number;
  limit: number;
  isRead?: boolean;
}

export interface INotificationsResponse {
  items: INotification[];
  totalItems: number;
  totalPages: number;
}

export interface IMarkAsReadRequest {
  notificationIds: number[];
}

