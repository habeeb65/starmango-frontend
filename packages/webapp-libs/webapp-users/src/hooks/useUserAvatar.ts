import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@sb/webapp-api-client';
import { AvatarUploadResponse } from '../types';
import { useUser } from './useUser';

/**
 * Hook for managing user avatar
 */
export const useUserAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await apiClient.post<AvatarUploadResponse>(
        '/users/avatar/', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Update user data in cache with new avatar URL
        queryClient.setQueryData(['currentUser'], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            avatar: data.avatar,
          };
        });
      },
    }
  );

  // Delete avatar mutation
  const deleteAvatarMutation = useMutation(
    async () => {
      await apiClient.delete('/users/avatar/');
    },
    {
      onSuccess: () => {
        // Update user data in cache to remove avatar URL
        queryClient.setQueryData(['currentUser'], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            avatar: undefined,
          };
        });
      },
    }
  );

  // Upload avatar function
  const uploadAvatar = useCallback(
    async (file: File) => {
      return await uploadAvatarMutation.mutateAsync(file);
    },
    [uploadAvatarMutation]
  );

  // Delete avatar function
  const deleteAvatar = useCallback(
    async () => {
      return await deleteAvatarMutation.mutateAsync();
    },
    [deleteAvatarMutation]
  );

  return {
    avatar: user?.avatar,
    uploadAvatar,
    deleteAvatar,
    isUploading: uploadAvatarMutation.isLoading,
    isDeleting: deleteAvatarMutation.isLoading,
  };
};