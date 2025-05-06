import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@sb/webapp-api-client';
import { UserProfile, UserProfileUpdateData } from '../types';
import { useUser } from './useUser';

// Query key for user profile
const USER_PROFILE_QUERY_KEY = 'userProfile';

/**
 * Hook for fetching and managing user profile data
 */
export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // Fetch user profile from API
  const { data: profile, isLoading, error } = useQuery<UserProfile>(
    [USER_PROFILE_QUERY_KEY],
    async () => {
      const response = await apiClient.get('/users/profile/');
      return response.data;
    },
    {
      // Only fetch if user is loaded
      enabled: !!user,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Update user profile mutation
  const updateProfileMutation = useMutation(
    async (data: UserProfileUpdateData) => {
      const response = await apiClient.patch('/users/profile/', data);
      return response.data;
    },
    {
      onSuccess: (updatedProfile) => {
        // Update profile in cache
        queryClient.setQueryData([USER_PROFILE_QUERY_KEY], updatedProfile);
        
        // Also update the current user data if first name or last name changed
        queryClient.invalidateQueries(['currentUser']);
      },
    }
  );

  // Update profile function
  const updateProfile = useCallback(
    async (data: UserProfileUpdateData) => {
      return await updateProfileMutation.mutateAsync(data);
    },
    [updateProfileMutation]
  );

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    isUpdating: updateProfileMutation.isLoading,
  };
};