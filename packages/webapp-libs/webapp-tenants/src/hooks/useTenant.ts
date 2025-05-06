import { useContext } from 'react';
import { TenantContext } from '../tenantContext';
import { Tenant, TenantContextState } from '../types';

/**
 * Hook to access the current tenant and tenant context
 * @returns Tenant context state with the current tenant
 */
export const useTenant = (): TenantContextState => {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }

  return context;
};

/**
 * Hook to check if a tenant is selected
 * @returns Boolean indicating if a tenant is selected
 */
export const useTenantSelected = (): boolean => {
  const { currentTenant } = useTenant();
  return !!currentTenant;
};

/**
 * Hook to get the current tenant
 * @returns Current tenant or null if no tenant is selected
 */
export const useCurrentTenant = (): Tenant | null => {
  const { currentTenant } = useTenant();
  return currentTenant;
};

/**
 * Hook to get the current tenant ID
 * @returns Current tenant ID or null if no tenant is selected
 */
export const useCurrentTenantId = (): string | null => {
  const currentTenant = useCurrentTenant();
  return currentTenant?.id || null;
};