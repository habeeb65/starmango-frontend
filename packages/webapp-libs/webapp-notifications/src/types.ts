/**
 * Notification related type definitions
 */

/**
 * Notification data structure
 */
export interface Notification {
  id: string;
  content: string;
  title?: string;
  read: boolean;
  createdAt: string;
  type: NotificationType;
  link?: string;
  relatedObjectId?: string;
  relatedObjectType?: string;
}

/**
 * Notification types
 */
export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  SYSTEM = 'system',
  INVITATION = 'invitation',
  TENANT = 'tenant',
}

/**
 * Notification list response
 */
export interface NotificationListResponse {
  results: Notification[];
  count: number;
  next: string | null;
  previous: string | null;
}

/**
 * Notification update data
 */
export interface NotificationUpdateData {
  read?: boolean;
}

/**
 * Notification context state
 */
export interface NotificationsContextState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}