import { useCallback } from 'react';
import { apiClient } from '@sb/webapp-api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tenant, TenantCreateData, TenantUpdateData } from '../types';

// Query key for tenant list
const TENANT_LIST_QUERY_KEY = 'tenants';

/**
 * Hook to fetch and manage the list of tenants
 * Uses React Query for caching and state management
 */
export const useTenantList = () => {
  const queryClient = useQueryClient();

  // Fetch list of tenants
  const { data: tenants = [], isLoading, error } = useQuery<Tenant[]>(
    [TENANT_LIST_QUERY_KEY],
    async () => {
      const response = await apiClient.get('/tenants/');
      return response.data.results || [];
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Create a new tenant
  const createTenantMutation = useMutation(
    async (data: TenantCreateData) => {
      const response = await apiClient.post('/tenants/', data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate tenant list query to trigger a refetch
        queryClient.invalidateQueries([TENANT_LIST_QUERY_KEY]);
      },
    }
  );

  // Update a tenant
  const updateTenantMutation = useMutation(
    async ({ id, data }: { id: string; data: TenantUpdateData }) => {
      const response = await apiClient.patch(`/tenants/${id}/`, data);
      return response.data;
    },
    {
      onSuccess: (updatedTenant) => {
        // Update tenant in cache
        queryClient.setQueryData<Tenant[]>(
          [TENANT_LIST_QUERY_KEY],
          (oldTenants = []) =>
            oldTenants.map((tenant) =>
              tenant.id === updatedTenant.id ? updatedTenant : tenant
            )
        );
      },
    }
  );

  // Delete a tenant
  const deleteTenantMutation = useMutation(
    async (id: string) => {
      await apiClient.delete(`/tenants/${id}/`);
      return id;
    },
    {
      onSuccess: (deletedId) => {
        // Remove tenant from cache
        queryClient.setQueryData<Tenant[]>(
          [TENANT_LIST_QUERY_KEY],
          (oldTenants = []) => oldTenants.filter((tenant) => tenant.id !== deletedId)
        );
      },
    }
  );

  // Create tenant function
  const createTenant = useCallback(
    async (data: TenantCreateData) => {
      return createTenantMutation.mutateAsync(data);
    },
    [createTenantMutation]
  );

  // Update tenant function
  const updateTenant = useCallback(
    async (id: string, data: TenantUpdateData) => {
      return updateTenantMutation.mutateAsync({ id, data });
    },
    [updateTenantMutation]
  );

  // Delete tenant function
  const deleteTenant = useCallback(
    async (id: string) => {
      return deleteTenantMutation.mutateAsync(id);
    },
    [deleteTenantMutation]
  );

  return {
    tenants,
    isLoading,
    error,
    createTenant,
    updateTenant,
    deleteTenant,
    isCreating: createTenantMutation.isLoading,
    isUpdating: updateTenantMutation.isLoading,
    isDeleting: deleteTenantMutation.isLoading,
  };
};