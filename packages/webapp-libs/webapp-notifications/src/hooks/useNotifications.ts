import { useContext } from 'react';
import { NotificationsContext } from '../components/NotificationsProvider';
import { NotificationsContextState } from '../types';

/**
 * Hook to access the notifications context
 * @returns Notifications context state
 */
export const useNotifications = (): NotificationsContextState => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
};

/**
 * Hook to get the count of unread notifications
 * @returns Number of unread notifications
 */
export const useUnreadNotificationsCount = (): number => {
  const { unreadCount } = useNotifications();
  return unreadCount;
};

/**
 * Hook to check if there are any notifications
 * @returns Boolean indicating if there are any notifications
 */
export const useHasNotifications = (): boolean => {
  const { notifications } = useNotifications();
  return notifications.length > 0;
};

/**
 * Hook to check if there are any unread notifications
 * @returns Boolean indicating if there are any unread notifications
 */
export const useHasUnreadNotifications = (): boolean => {
  const { unreadCount } = useNotifications();
  return unreadCount > 0;
};