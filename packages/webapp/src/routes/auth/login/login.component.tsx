import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
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
} from '@chakra-ui/react';
import { useAuth } from '@sb/webapp-api-client';
import { RoutesConfig } from '../../../app/config/routes';

// Validation schema for login form
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  remember: yup
    .boolean(),
});

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

/**
 * Login form component
 */
export const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password, data.remember);
      // Redirect to dashboard or default route after successful login
      navigate(RoutesConfig.home);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description:
          'Unable to log in with provided credentials. Please check your email and password.',
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
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
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
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register('password')}
                placeholder="Your password"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                <Checkbox {...register('remember')}>Remember me</Checkbox>
                <Link 
                  as={RouterLink} 
                  color="blue.500" 
                  to={RoutesConfig.auth.passwordReset}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Signing in..."
                size="lg"
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Don't have an account?{' '}
                <Link 
                  as={RouterLink} 
                  color="blue.500" 
                  to={RoutesConfig.auth.signup}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};