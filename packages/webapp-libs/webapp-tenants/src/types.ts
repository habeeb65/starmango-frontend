/**
 * Tenant related type definitions
 */

/**
 * Tenant data structure
 */
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt?: string;
  domain?: string;
  owner?: {
    id: string;
    email: string;
  };
}

/**
 * Tenant creation data
 */
export interface TenantCreateData {
  name: string;
  domain?: string;
}

/**
 * Tenant update data
 */
export interface TenantUpdateData {
  name?: string;
  domain?: string;
  isActive?: boolean;
}

/**
 * Tenant context state
 */
export interface TenantContextState {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  isLoading: boolean;
  error: Error | null;
  createTenant: (data: TenantCreateData) => Promise<Tenant>;
  updateTenant: (id: string, data: TenantUpdateData) => Promise<Tenant>;
  deleteTenant: (id: string) => Promise<void>;
  switchTenant: (id: string) => Promise<void>;
}