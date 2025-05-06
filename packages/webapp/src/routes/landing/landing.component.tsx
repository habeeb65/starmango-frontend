import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Simple hero icon
const HeroIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.5 13.5h-5v-2h1.5v-5h-1.5v-2h4v7h1.5v2z"
    />
  </Icon>
);

/**
 * Feature section component
 */
const FeatureSection = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactElement;
}) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="blue.500"
        mb={4}
      >
        {icon}
      </Flex>
      <Heading as="h3" size="md" fontWeight="bold" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
};

/**
 * Landing page component
 */
export const Landing = () => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'gray.900')}
        py={20}
        px={8}
      >
        <Container maxW="container.xl">
          <Stack
            align="center"
            spacing={8}
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
          >
            <Stack flex={1} spacing={5} maxW={{ base: 'full', md: 'lg' }}>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                color={useColorModeValue('gray.900', 'white')}
                lineHeight="1.2"
              >
                StarMango SaaS Platform
              </Heading>
              
              <Text
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize="xl"
              >
                Manage your business effortlessly with our powerful multi-tenant SaaS platform. Built with Django and React.
              </Text>
              
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                mt={2}
              >
                <Button
                  as={RouterLink}
                  to="/auth/signup"
                  colorScheme="blue"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="bold"
                  size="lg"
                >
                  Get Started
                </Button>
                <Button
                  as={RouterLink}
                  to="/auth/login"
                  variant="outline"
                  colorScheme="blue"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="bold"
                  size="lg"
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
            
            <Flex
              flex={1}
              justify="center"
              align="center"
            >
              <Box
                position="relative"
                height="300px"
                width="full"
                overflow="hidden"
                boxShadow="2xl"
                borderRadius="xl"
              >
                {/* Placeholder for hero image */}
                <Box
                  bg="blue.500"
                  h="full"
                  w="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={HeroIcon} boxSize={24} color="white" />
                </Box>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} px={8} bg={bg}>
        <Container maxW="container.xl">
          <Stack spacing={4} as={Container} textAlign="center" mb={16}>
            <Heading fontSize="3xl">Key Features</Heading>
            <Text color="gray.600" maxW="3xl" mx="auto">
              Everything you need to run and scale your SaaS business.
            </Text>
          </Stack>

          <Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={10}
              justify="center"
            >
              <FeatureSection
                icon={<Icon as={HeroIcon} w={10} h={10} />}
                title="Multi-tenancy"
                text="Securely manage multiple organizations with full data isolation."
              />
              <FeatureSection
                icon={<Icon as={HeroIcon} w={10} h={10} />}
                title="Authentication"
                text="Secure JWT-based authentication with Django backend integration."
              />
              <FeatureSection
                icon={<Icon as={HeroIcon} w={10} h={10} />}
                title="User Management"
                text="Granular user roles and permissions for robust team management."
              />
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="blue.700" color="white" py={16} px={8}>
        <Container maxW="container.xl">
          <Stack spacing={4} as={Container} textAlign="center">
            <Heading fontSize="3xl">Ready to get started?</Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto">
              Join thousands of organizations who trust our platform for their business needs.
            </Text>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              justify="center"
              mt={4}
            >
              <Button
                as={RouterLink}
                to="/auth/signup"
                colorScheme="blue"
                bg="white"
                color="blue.700"
                px={8}
                py={6}
                _hover={{ bg: 'gray.100' }}
                fontSize="md"
                fontWeight="bold"
                size="lg"
              >
                Sign Up Now
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                variant="outline"
                colorScheme="whiteAlpha"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="bold"
                size="lg"
                borderWidth={2}
              >
                Contact Sales
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10} px={8}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            justify="space-between"
            align="center"
          >
            <Text>© 2025 StarMango SaaS. All rights reserved.</Text>
            <Stack direction="row" spacing={6}>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Contact</Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};