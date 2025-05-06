import React from 'react';
import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

/**
 * Error fallback component that displays when the application crashes
 * Used by the ErrorBoundary in initApp.tsx
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading as="h1" size="xl" color="red.500">
          {t('common.error', 'Something went wrong')}
        </Heading>
        
        <Text fontSize="lg">
          {t('common.errorDescription', 'An unexpected error occurred in the application.')}
        </Text>
        
        <Box bg="gray.50" p={4} borderRadius="md" width="100%" overflowX="auto">
          <Text color="red.500" fontFamily="monospace">
            {error.message}
          </Text>
        </Box>
        
        <Button 
          colorScheme="brand" 
          onClick={resetErrorBoundary}
        >
          {t('common.tryAgain', 'Try again')}
        </Button>
      </VStack>
    </Container>
  );
};