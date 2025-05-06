import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '@sb/webapp-api-client';
import { useUser, UserAvatarSm } from '@sb/webapp-users';
import { NotificationBell } from '@sb/webapp-notifications';
import { RoutesConfig } from '../../../app/config/routes';

// Simple icons for the header
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TenantSwitcherIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface HeaderLink {
  name: string;
  to: string;
}

const publicLinks: HeaderLink[] = [
  { name: 'Features', to: '#features' },
  { name: 'Pricing', to: '#pricing' },
  { name: 'Contact', to: '#contact' },
];

const privateLinks: HeaderLink[] = [
  { name: 'Dashboard', to: RoutesConfig.dashboard },
  { name: 'Projects', to: '/projects' },
  { name: 'Tasks', to: '/tasks' },
];

interface HeaderProps {
  onMobileNavToggle?: () => void;
}

/**
 * Main header component with navigation
 */
export const Header = ({ onMobileNavToggle }: HeaderProps) => {
  const { isLoggedIn, logout } = useAuth();
  const { user } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const links = isLoggedIn ? privateLinks : publicLinks;

  const handleLogout = async () => {
    try {
      await logout();
      navigate(RoutesConfig.home);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      as="header"
      bg={bg}
      px={4}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onMobileNavToggle}
        />
        
        <HStack spacing={8} alignItems="center">
          <Box fontWeight="bold" fontSize="xl">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              StarMango
            </Link>
          </Box>
          
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                px={2}
                py={1}
                rounded="md"
                to={link.to}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
              >
                {link.name}
              </Link>
            ))}
          </HStack>
        </HStack>
        
        <Flex alignItems="center">
          <IconButton
            mr={4}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
            variant="ghost"
          />
          
          {isLoggedIn ? (
            <HStack spacing={3}>
              <NotificationBell />
              
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <UserAvatarSm src={user?.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/settings">
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack spacing={4}>
              <Button 
                as={RouterLink} 
                to={RoutesConfig.auth.login}
                variant="ghost"
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                to={RoutesConfig.auth.signup}
                colorScheme="blue"
              >
                Sign Up
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};