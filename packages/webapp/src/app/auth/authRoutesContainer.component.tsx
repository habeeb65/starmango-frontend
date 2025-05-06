import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react';

import { ROUTES } from '../config/routes';

/**
 * Container component for authentication routes
 * Provides layout for login, signup, etc. pages
 */
export const AuthRoutesContainer = () => {
  // Placeholder for authentication check
  // In a real implementation, check if user is authenticated and redirect to app if they are
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.app.index} replace />;
  }

  return (
    <Flex minH="100vh" direction={{ base: 'column', md: 'row' }}>
      {/* Left side - Brand/Logo */}
      <Box 
        flex={{ base: '0', md: '1' }} 
        bg="brand.600" 
        color="white"
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={6}>
          <Box as="h1" fontSize="3xl" fontWeight="bold">
            StarMango
          </Box>
          <Box textAlign="center" maxW="80%" fontSize="lg">
            Your multi-tenant SaaS platform
          </Box>
        </VStack>
      </Box>

      {/* Right side - Auth forms */}
      <Box flex="1" py={12} px={4}>
        <Container maxW="md">
          <Box display={{ base: 'block', md: 'none' }} mb={8} textAlign="center">
            <Box as="h1" fontSize="2xl" fontWeight="bold" color="brand.600">
              StarMango
            </Box>
          </Box>
          
          {/* Render the specific auth route (login, signup, etc.) */}
          <Outlet />
        </Container>
      </Box>
    </Flex>
  );
};