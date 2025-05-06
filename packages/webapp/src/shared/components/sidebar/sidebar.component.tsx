import React from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  CloseButton,
  Divider,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { RoutesConfig } from '../../../app/config/routes';

// Navigation item icons
const DashboardIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor" />
  </svg>
);

const ProjectsIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor" />
    <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" fill="currentColor" />
  </svg>
);

const TasksIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
  </svg>
);

const CalendarIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" fill="currentColor" />
    <path d="M9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="currentColor" />
  </svg>
);

const ReportsIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" />
  </svg>
);

const TeamsIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor" />
  </svg>
);

const SettingsIcon = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor" />
  </svg>
);

interface NavItemProps {
  icon: React.ReactElement;
  children: React.ReactNode;
  to: string;
}

/**
 * Navigation item component
 */
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const inactiveBg = useColorModeValue('white', 'gray.800');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const inactiveColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : inactiveBg}
        color={isActive ? activeColor : inactiveColor}
        _hover={{
          bg: activeBg,
          color: activeColor,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={() => icon}
            _groupHover={{
              color: activeColor,
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface SidebarProps {
  onClose: () => void;
  display?: { base: string; md: string };
}

/**
 * Sidebar component for application navigation
 */
export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      transition="3s ease"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          StarMango
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Box mt={2}>
        <NavItem icon={<DashboardIcon />} to={RoutesConfig.dashboard}>
          Dashboard
        </NavItem>
        <NavItem icon={<ProjectsIcon />} to="/projects">
          Projects
        </NavItem>
        <NavItem icon={<TasksIcon />} to="/tasks">
          Tasks
        </NavItem>
        <NavItem icon={<CalendarIcon />} to="/calendar">
          Calendar
        </NavItem>
        <NavItem icon={<ReportsIcon />} to="/reports">
          Reports
        </NavItem>
        
        <Divider my={4} borderColor={borderColor} />
        
        <NavItem icon={<TeamsIcon />} to="/team">
          Team
        </NavItem>
        <NavItem icon={<SettingsIcon />} to="/settings">
          Settings
        </NavItem>
      </Box>
    </Box>
  );
};