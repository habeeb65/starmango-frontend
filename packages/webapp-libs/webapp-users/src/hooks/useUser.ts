import { useAuth } from '@sb/webapp-api-client';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@sb/webapp-api-client';
import { UserData } from '../types';

// Query key for current user
const CURRENT_USER_QUERY_KEY = 'currentUser';

/**
 * Hook to get the current authenticated user data
 */
export const useUser = () => {
  const { isLoggedIn } = useAuth();

  // Fetch current user data from API
  const { data: user, isLoading, error } = useQuery<UserData>(
    [CURRENT_USER_QUERY_KEY],
    async () => {
      const response = await apiClient.get('/users/me/');
      return response.data;
    },
    {
      // Only fetch if user is logged in
      enabled: isLoggedIn,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  return {
    user,
    isLoading,
    error,
  };
};

/**
 * Hook to get the full name of the current user
 * @returns Full name of the user or email if name is not available
 */
export const useUserDisplayName = () => {
  const { user } = useUser();

  if (!user) {
    return '';
  }

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) {
    return user.firstName;
  }

  return user.email;
};