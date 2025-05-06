import { useState, useEffect, useCallback } from 'react';
import { authService } from './index';
import { JwtToken, LoginCredentials, PasswordResetConfirmData, PasswordResetRequestData, RegistrationData, UserData } from './types';
import { useNavigate } from 'react-router-dom';

// Define hook return types
interface UseAuthReturn {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (data: PasswordResetRequestData) => Promise<void>;
  confirmPasswordReset: (data: PasswordResetConfirmData) => Promise<void>;
  refreshToken: () => Promise<JwtToken>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for authentication functionality
 * @returns Authentication methods and state
 */
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [user, setUser] = useState<UserData | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthed = authService.isAuthenticated();
      setIsAuthenticated(isAuthed);
      
      if (isAuthed && !user) {
        try {
          setIsLoading(true);
          const userData = await authService.fetchUserProfile();
          setUser(userData);
        } catch (err: any) {
          console.error('Failed to fetch user profile:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    checkAuth();
  }, [user]);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user } = await authService.login(credentials);
      setIsAuthenticated(true);
      setUser(user);
      navigate('/app'); // Redirect to app dashboard after login
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Register function
  const register = useCallback(async (data: RegistrationData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.register(data);
      navigate('/auth/login'); // Redirect to login page after successful registration
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/auth/login'); // Redirect to login page after logout
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Request password reset function
  const requestPasswordReset = useCallback(async (data: PasswordResetRequestData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.requestPasswordReset(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Confirm password reset function
  const confirmPasswordReset = useCallback(async (data: PasswordResetConfirmData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.confirmPasswordReset(data);
      navigate('/auth/login'); // Redirect to login page after password reset
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await authService.refreshToken();
    } catch (err: any) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
      navigate('/auth/login'); // Redirect to login page if token refresh fails
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
    refreshToken,
    isLoading,
    error,
  };
};