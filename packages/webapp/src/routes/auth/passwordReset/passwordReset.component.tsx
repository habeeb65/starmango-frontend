import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useAuth } from '@sb/webapp-api-client';
import { RoutesConfig } from '../../../app/config/routes';

// Validation schema for password reset form
const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

interface PasswordResetFormData {
  email: string;
}

/**
 * Password reset request form component
 */
export const PasswordReset = () => {
  const toast = useToast();
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    
    try {
      await requestPasswordReset(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request error:', error);
      toast({
        title: 'Request Failed',
        description:
          'Unable to process your password reset request. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      p={4}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Reset your password</Heading>
          <Text fontSize="lg" color="gray.600">
            Enter your email address to receive a password reset link
          </Text>
        </Stack>
        
        {isSubmitted ? (
          <Box
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={8}
          >
            <Alert
              status="success"
              borderRadius="md"
              mb={4}
            >
              <AlertIcon />
              Password reset instructions have been sent to your email.
            </Alert>
            
            <Text mb={4}>
              Please check your email for instructions to reset your password. 
              If you don't receive an email within a few minutes, please check your spam folder.
            </Text>
            
            <Stack spacing={4}>
              <Button
                as={RouterLink}
                to={RoutesConfig.auth.login}
                colorScheme="blue"
                size="lg"
              >
                Return to Login
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={8}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="Your email address"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Sending..."
                  size="lg"
                >
                  Send Reset Link
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  Remember your password?{' '}
                  <Link 
                    as={RouterLink} 
                    color="blue.500" 
                    to={RoutesConfig.auth.login}
                  >
                    Sign in
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Flex>
  );
};