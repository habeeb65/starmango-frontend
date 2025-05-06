import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { apiClient } from '@sb/webapp-api-client';
import { Notification, NotificationsContextState } from '../types';

// Create context for notifications
export const NotificationsContext = createContext<NotificationsContextState | null>(null);

interface NotificationsProviderProps {
  children: ReactNode;
}

/**
 * Provider component for notifications management
 * Fetches and manages notification state
 */
export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch notifications from API
   */
  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/notifications/');
      const data = response.data;
      
      setNotifications(data.results || []);
      setUnreadCount(data.results.filter((notification: Notification) => !notification.read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Mark a notification as read
   * @param id Notification ID
   */
  const markAsRead = useCallback(async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/`, {
        read: true,
      });
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      throw err;
    }
  }, []);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    try {
      await apiClient.post('/notifications/mark-all-read/');
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Update unread count
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
      throw err;
    }
  }, []);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Set up polling to check for new notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const contextValue: NotificationsContextState = {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};