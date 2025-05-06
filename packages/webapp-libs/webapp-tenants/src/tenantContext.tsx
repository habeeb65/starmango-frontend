import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { apiClient } from '@sb/webapp-api-client';
import { Tenant, TenantContextState, TenantCreateData, TenantUpdateData } from './types';

// Context for tenant state
export const TenantContext = createContext<TenantContextState | null>(null);

// Key for storing current tenant in local storage
const CURRENT_TENANT_KEY = 'current_tenant';

interface TenantProviderProps {
  children: ReactNode;
}

/**
 * Provider component for tenant management
 * Manages the current tenant and provides methods for tenant operations
 */
export const TenantProvider = ({ children }: TenantProviderProps) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load tenants on mount
  useEffect(() => {
    const loadTenants = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch tenants from API
        const response = await apiClient.get('/tenants/');
        setTenants(response.data.results || []);
        
        // Load current tenant from storage
        const storedTenant = localStorage.getItem(CURRENT_TENANT_KEY);
        
        if (storedTenant) {
          const parsedTenant = JSON.parse(storedTenant);
          setCurrentTenant(parsedTenant);
        }
      } catch (err) {
        console.error('Failed to load tenants:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTenants();
  }, []);

  /**
   * Create a new tenant
   * @param data Tenant creation data
   * @returns Newly created tenant
   */
  const createTenant = useCallback(async (data: TenantCreateData): Promise<Tenant> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/tenants/', data);
      const newTenant = response.data;
      
      setTenants(prev => [...prev, newTenant]);
      
      return newTenant;
    } catch (err) {
      console.error('Failed to create tenant:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update an existing tenant
   * @param id Tenant ID
   * @param data Tenant update data
   * @returns Updated tenant
   */
  const updateTenant = useCallback(async (id: string, data: TenantUpdateData): Promise<Tenant> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.patch(`/tenants/${id}/`, data);
      const updatedTenant = response.data;
      
      setTenants(prev => 
        prev.map(tenant => tenant.id === id ? updatedTenant : tenant)
      );
      
      // Update current tenant if necessary
      if (currentTenant?.id === id) {
        setCurrentTenant(updatedTenant);
        localStorage.setItem(CURRENT_TENANT_KEY, JSON.stringify(updatedTenant));
      }
      
      return updatedTenant;
    } catch (err) {
      console.error('Failed to update tenant:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentTenant]);

  /**
   * Delete a tenant
   * @param id Tenant ID
   */
  const deleteTenant = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiClient.delete(`/tenants/${id}/`);
      
      setTenants(prev => prev.filter(tenant => tenant.id !== id));
      
      // Clear current tenant if it was deleted
      if (currentTenant?.id === id) {
        setCurrentTenant(null);
        localStorage.removeItem(CURRENT_TENANT_KEY);
      }
    } catch (err) {
      console.error('Failed to delete tenant:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentTenant]);

  /**
   * Switch to a different tenant
   * @param id Tenant ID
   */
  const switchTenant = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const tenant = tenants.find(t => t.id === id);
      
      if (!tenant) {
        throw new Error('Tenant not found');
      }
      
      setCurrentTenant(tenant);
      localStorage.setItem(CURRENT_TENANT_KEY, JSON.stringify(tenant));
      
      // Optional: Call API to set current tenant
      await apiClient.post('/tenants/set-current/', { tenant_id: id });
    } catch (err) {
      console.error('Failed to switch tenant:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [tenants]);

  const contextValue: TenantContextState = {
    currentTenant,
    tenants,
    isLoading,
    error,
    createTenant,
    updateTenant,
    deleteTenant,
    switchTenant,
  };

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
};