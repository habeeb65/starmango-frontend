import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useHasUnreadNotifications, useNotifications, useUnreadNotificationsCount } from '../hooks/useNotifications';
import { NotificationsList } from './NotificationsList';

// Icon component for the bell
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
      fill="currentColor"
    />
  </svg>
);

interface NotificationBellProps {
  ariaLabel?: string;
}

/**
 * Notification bell component with a dropdown of notifications
 */
export const NotificationBell: React.FC<NotificationBellProps> = ({ ariaLabel = 'Notifications' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { markAllAsRead } = useNotifications();
  const unreadCount = useUnreadNotificationsCount();
  const hasUnread = useHasUnreadNotifications();
  
  // Colors
  const badgeBg = useColorModeValue('red.500', 'red.300');
  const badgeColor = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('gray.100', 'gray.700');
  
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-end"
      closeOnBlur={true}
      closeOnEsc={true}
    >
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label={ariaLabel}
            icon={<BellIcon />}
            variant="ghost"
            borderRadius="full"
            onClick={() => setIsOpen(!isOpen)}
            _hover={{ bg: 'gray.100' }}
          />
          
          {hasUnread && (
            <Box
              position="absolute"
              top="-2px"
              right="-2px"
              px={unreadCount > 9 ? 1 : 1.5}
              py={0.5}
              fontSize="xs"
              fontWeight="bold"
              lineHeight="none"
              color={badgeColor}
              bg={badgeBg}
              borderRadius="full"
              zIndex={1}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Box>
          )}
        </Box>
      </PopoverTrigger>
      
      <PopoverContent width="350px" maxHeight="500px">
        <PopoverArrow />
        <PopoverCloseButton />
        
        <PopoverHeader bg={headerBg} fontWeight="bold" p={4}>
          <Flex justify="space-between" align="center">
            <Text>Notifications</Text>
            {hasUnread && (
              <Button size="xs" onClick={handleMarkAllAsRead} colorScheme="blue" variant="ghost">
                Mark all as read
              </Button>
            )}
          </Flex>
        </PopoverHeader>
        
        <PopoverBody p={0} maxHeight="350px" overflowY="auto">
          <NotificationsList />
        </PopoverBody>
        
        <PopoverFooter p={2} textAlign="center">
          <Button
            size="sm"
            width="full"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};