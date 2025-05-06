import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Link,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from '../hooks/useNotifications';
import { Notification, NotificationType } from '../types';

// Icons for different notification types
const TypeIcon = ({ type }: { type: NotificationType }) => {
  let iconElement;

  switch (type) {
    case NotificationType.INFO:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor" />
        </svg>
      );
      break;
    case NotificationType.WARNING:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor" />
        </svg>
      );
      break;
    case NotificationType.ERROR:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
        </svg>
      );
      break;
    case NotificationType.SUCCESS:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor" />
        </svg>
      );
      break;
    case NotificationType.INVITATION:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
        </svg>
      );
      break;
    case NotificationType.TENANT:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z" fill="currentColor" />
        </svg>
      );
      break;
    default:
      iconElement = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM19 15H6L5 16V5H19V15Z" fill="currentColor" />
        </svg>
      );
  }

  return <Icon as={() => iconElement} boxSize={5} />;
};

// Color scheme for different notification types
const getTypeColors = (type: NotificationType) => {
  switch (type) {
    case NotificationType.INFO:
      return { color: 'blue.500', bg: 'blue.50' };
    case NotificationType.WARNING:
      return { color: 'orange.500', bg: 'orange.50' };
    case NotificationType.ERROR:
      return { color: 'red.500', bg: 'red.50' };
    case NotificationType.SUCCESS:
      return { color: 'green.500', bg: 'green.50' };
    case NotificationType.INVITATION:
      return { color: 'purple.500', bg: 'purple.50' };
    case NotificationType.TENANT:
      return { color: 'teal.500', bg: 'teal.50' };
    default:
      return { color: 'gray.500', bg: 'gray.50' };
  }
};

/**
 * Single notification item component
 */
const NotificationItem = ({ notification, onClick }: { notification: Notification; onClick: () => void }) => {
  const { title, content, createdAt, type, read } = notification;
  const navigate = useNavigate();
  
  const typeColors = getTypeColors(type);
  const bg = useColorModeValue(read ? 'white' : 'gray.50', read ? 'gray.800' : 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');
  
  const handleClick = () => {
    onClick();
    
    // Navigate to link if provided
    if (notification.link) {
      navigate(notification.link);
    }
  };
  
  return (
    <Box
      p={3}
      bg={bg}
      _hover={{ bg: hoverBg, cursor: 'pointer' }}
      borderLeft={read ? 'none' : '4px solid'}
      borderLeftColor={typeColors.color}
      onClick={handleClick}
      width="100%"
    >
      <HStack spacing={3} align="flex-start">
        <Box
          p={2}
          borderRadius="md"
          bg={typeColors.bg}
          color={typeColors.color}
        >
          <TypeIcon type={type} />
        </Box>
        
        <VStack align="flex-start" spacing={1} flex={1}>
          <HStack width="100%" justify="space-between">
            <Text fontWeight="bold" fontSize="sm">
              {title || type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Text>
          </HStack>
          
          <Text fontSize="sm" noOfLines={2}>
            {content}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

/**
 * Empty state component for when there are no notifications
 */
const EmptyNotifications = () => (
  <Box py={6} px={4} textAlign="center">
    <Text color="gray.500">No notifications yet.</Text>
  </Box>
);

/**
 * List of notifications component
 */
export const NotificationsList: React.FC = () => {
  const { notifications, markAsRead, isLoading } = useNotifications();

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
  };

  if (isLoading && notifications.length === 0) {
    return (
      <Box py={6} px={4} textAlign="center">
        <Text color="gray.500">Loading notifications...</Text>
      </Box>
    );
  }

  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <VStack spacing={0} divider={<Divider />} width="100%">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => handleNotificationClick(notification)}
        />
      ))}
    </VStack>
  );
};