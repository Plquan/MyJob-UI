import { useEffect, useState } from 'react';
import { Button, Tag, Empty, Spin, Pagination, Modal, message, Tabs } from 'antd';
import { BellOutlined, CheckOutlined, DeleteOutlined, UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined, InboxOutlined } from '@ant-design/icons';
import notificationService from '../../../services/notificationService';
import type { INotification, NotificationType } from '../../../types/notification/NotificationType';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '../../../routes/routePath';

const EmployerNotifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchNotifications = async (page: number = 1, isRead?: boolean) => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications({
        page,
        limit: pagination.limit,
        isRead,
      });
      setNotifications(response.items);
      setPagination({
        page,
        limit: pagination.limit,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      message.error('Không thể tải thông báo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isRead = activeTab === 'unread' ? false : activeTab === 'read' ? true : undefined;
    fetchNotifications(1, isRead);
  }, [activeTab]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await notificationService.markAsRead({ notificationIds: [notificationId] });
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      message.success('Đã đánh dấu là đã đọc');
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      message.success('Đã đánh dấu tất cả là đã đọc');
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (notificationId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa thông báo này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await notificationService.deleteNotification(notificationId);
          setNotifications(prev => prev.filter(n => n.id !== notificationId));
          message.success('Đã xóa thông báo');
        } catch (error) {
          message.error('Có lỗi xảy ra');
        }
      },
    });
  };

  const handleNotificationClick = (notification: INotification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    if (notification.type === 'NEW_APPLICATION') {
      navigate(ROUTE_PATH.EMPLOYER_MANAGE_RESUME);
    } else if (notification.type === 'JOB_POST_APPROVED' || notification.type === 'JOB_POST_REJECTED') {
      navigate(ROUTE_PATH.EMPLOYER_JOB_POST);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'NEW_APPLICATION':
        return <UserAddOutlined />;
      case 'JOB_POST_APPROVED':
        return <CheckCircleOutlined />;
      case 'JOB_POST_REJECTED':
        return <CloseCircleOutlined />;
      default:
        return <BellOutlined />;
    }
  };

  const getNotificationBgColor = (type: NotificationType, isRead: boolean) => {
    if (isRead) return 'bg-gray-400';

    switch (type) {
      case 'NEW_APPLICATION':
        return 'bg-blue-500';
      case 'JOB_POST_APPROVED':
        return 'bg-green-500';
      case 'JOB_POST_REJECTED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    const isRead = activeTab === 'unread' ? false : activeTab === 'read' ? true : undefined;
    fetchNotifications(page, isRead);
  };

  const tabItems = [
    {
      key: 'all',
      label: `Tất cả`,
    },
    {
      key: 'unread',
      label: `Chưa đọc`,
    },
    {
      key: 'read',
      label: `Đã đọc`,
    },
  ];

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <BellOutlined />
              Thông báo
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Theo dõi ứng viên mới và trạng thái tin tuyển dụng
            </p>
          </div>
          {notifications.some(n => !n.isRead) && (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleMarkAllAsRead}
              className="bg-[#154C91]"
            >
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
      </div>

      <div className="px-4 md:px-6 border-b border-gray-200">
        <Tabs
          activeKey={activeTab}
          items={tabItems}
          onChange={handleTabChange}
        />
      </div>

      <div className="p-4 md:p-6">
        <Spin spinning={loading}>
          {notifications.length === 0 ? (
            <Empty
              description={
                activeTab === 'unread'
                  ? "Bạn không có thông báo chưa đọc"
                  : activeTab === 'read'
                    ? "Bạn chưa đọc thông báo nào"
                    : "Chưa có thông báo nào"
              }
              className="py-12"
              image={<InboxOutlined style={{ fontSize: 80, color: '#d9d9d9' }} />}
            />
          ) : (
            <>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${!notification.isRead
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getNotificationBgColor(notification.type, notification.isRead)
                        }`}>
                        <span className="text-white text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`text-sm md:text-base ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2"></span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>

                          <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification.id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    current={pagination.page}
                    total={pagination.totalItems}
                    pageSize={pagination.limit}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total) => `Tổng ${total} thông báo`}
                  />
                </div>
              )}
            </>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default EmployerNotifications;

