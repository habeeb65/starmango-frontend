import React, { createContext, ReactNode, useContext } from 'react';
import axios from 'axios';

interface ApiContextValue {
  apiClient: ReturnType<typeof createApiClient>;
}

const ApiContext = createContext<ApiContextValue | null>(null);

/**
 * Create an API client with axios that connects to the Django backend
 */
export const createApiClient = () => {
  // Create axios instance with default configuration
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for handling cookies and CSRF tokens
  });

  // Add request interceptor for authentication tokens
  client.interceptors.request.use(
    (config) => {
      // Get token from localStorage or cookies
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Set Authorization header with JWT token
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle authentication errors (401)
      if (error.response && error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/auth/login';
      }
      
      return Promise.reject(error);
    }
  );

  // Return API methods
  return {
    client,
    
    // Auth methods
    auth: {
      login: (email: string, password: string) => 
        client.post('/auth/login/', { email, password }),
      
      register: (email: string, password: string) => 
        client.post('/auth/register/', { email, password }),
      
      logout: () => 
        client.post('/auth/logout/'),
      
      resetPassword: (email: string) => 
        client.post('/auth/password-reset/', { email }),
      
      confirmResetPassword: (uid: string, token: string, password: string) => 
        client.post('/auth/password-reset/confirm/', { uid, token, password }),
    },
    
    // User methods
    user: {
      getProfile: () => 
        client.get('/users/me/'),
      
      updateProfile: (data: any) => 
        client.patch('/users/me/', data),
    },
    
    // Add other API methods as needed
  };
};

interface ApiProviderProps {
  children: ReactNode;
}

/**
 * Provider component for the API client
 */
export const ApiProvider = ({ children }: ApiProviderProps) => {
  const apiClient = React.useMemo(() => createApiClient(), []);
  
  return (
    <ApiContext.Provider value={{ apiClient }}>
      {children}
    </ApiContext.Provider>
  );
};

/**
 * Hook to use the API client
 */
export const useApi = () => {
  const context = useContext(ApiContext);
  
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  
  return context.apiClient;
};