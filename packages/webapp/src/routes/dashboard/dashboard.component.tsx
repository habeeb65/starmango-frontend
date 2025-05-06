import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCurrentTenant } from '@sb/webapp-tenants';
import { useUser } from '@sb/webapp-users';

// Simple dashboard icon
const DashboardIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
    />
  </Icon>
);

/**
 * StatCard component for dashboard metrics
 */
const StatCard = ({ label, number, helpText, color }: { label: string; number: string; helpText: string; color: string }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  
  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg" 
      bg={bgColor}
    >
      <Stat>
        <StatLabel fontSize="md" color="gray.500">{label}</StatLabel>
        <StatNumber fontSize="3xl" color={color}>{number}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
};

/**
 * Dashboard component
 * Displays an overview of the current tenant and user's data
 */
export const Dashboard = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const currentTenant = useCurrentTenant();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  if (isUserLoading) {
    return (
      <Box p={8}>
        <Text>Loading dashboard...</Text>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)">
      <Container maxW="container.xl" py={8}>
        <Flex 
          justify="space-between" 
          align="center" 
          mb={8}
        >
          <Heading size="lg">Dashboard</Heading>
          <Button colorScheme="blue">Create New</Button>
        </Flex>

        {currentTenant && (
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            mb={8}
          >
            <Heading size="md" mb={2}>
              {currentTenant.name}
            </Heading>
            <Text color="gray.500">
              Tenant ID: {currentTenant.id}
            </Text>
            {currentTenant.domain && (
              <Text color="gray.500">
                Domain: {currentTenant.domain}
              </Text>
            )}
          </Box>
        )}

        <Grid 
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
          gap={6}
          mb={10}
        >
          <StatCard 
            label="Total Users" 
            number="52" 
            helpText="15% increase from last month" 
            color="blue.500" 
          />
          <StatCard 
            label="Active Projects" 
            number="24" 
            helpText="8 new this month" 
            color="green.500" 
          />
          <StatCard 
            label="Completed Tasks" 
            number="187" 
            helpText="12% increase" 
            color="purple.500" 
          />
          <StatCard 
            label="Pending Items" 
            number="8" 
            helpText="3 require attention" 
            color="orange.500" 
          />
        </Grid>

        <Box 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="lg" 
          bg={cardBg}
          mb={8}
          height="300px"
        >
          <Heading size="md" mb={4}>
            Recent Activity
          </Heading>
          <Flex 
            direction="column" 
            justify="center" 
            align="center" 
            height="200px"
          >
            <Icon as={DashboardIcon} boxSize={12} color="blue.500" mb={4} />
            <Text color="gray.500">
              Activity data will be displayed here
            </Text>
          </Flex>
        </Box>

        <Grid 
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} 
          gap={6}
        >
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            height="200px"
          >
            <Heading size="md" mb={4}>
              Tasks Overview
            </Heading>
            <Flex 
              direction="column" 
              justify="center" 
              align="center" 
              height="120px"
            >
              <Text color="gray.500">
                Task data will be displayed here
              </Text>
            </Flex>
          </Box>
          <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={cardBg}
            height="200px"
          >
            <Heading size="md" mb={4}>
              Team Members
            </Heading>
            <Flex 
              direction="column" 
              justify="center" 
              align="center" 
              height="120px"
            >
              <Text color="gray.500">
                Team member data will be displayed here
              </Text>
            </Flex>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};