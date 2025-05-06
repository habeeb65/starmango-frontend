import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import { ROUTES } from '../config/routes';

/**
 * Wrapper component for routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export const PrivateRoutes = () => {
  // Placeholder for authentication check
  // In a real implementation, this would check if the user is authenticated
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.auth.login} replace />;
  }

  return (
    <Flex minH="100vh" direction="column">
      {/* App Header Placeholder */}
      <Box bg="white" px={4} py={2} borderBottom="1px" borderColor="gray.200">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" fontSize="xl" color="brand.600">
            StarMango
          </Box>
          
          {/* User menu placeholder */}
          <Box>User Menu</Box>
        </Flex>
      </Box>

      {/* Main content area */}
      <Box flex="1" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};