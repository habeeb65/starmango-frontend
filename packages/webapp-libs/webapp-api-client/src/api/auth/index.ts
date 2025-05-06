import { apiClient } from '../client';
import { getErrorMessage } from '../helpers';
import { JwtToken, LoginCredentials, PasswordResetConfirmData, PasswordResetRequestData, RegistrationData, TokenPayload, UserData } from './types';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// Constants for storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

/**
 * Authentication service for JWT token management
 */
export const authService = {
  /**
   * Login user with email and password
   * @param credentials Login credentials
   * @returns JWT token and user data
   */
  async login(credentials: LoginCredentials): Promise<{ token: JwtToken; user: UserData }> {
    try {
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.post('/auth/token/', credentials);
      const token: JwtToken = {
        token: response.data.access,
        refreshToken: response.data.refresh,
        expiresIn: 3600, // Adjust based on your token expiration
      };
      
      // Save tokens
      this.setAuthTokens(token);
      
      // Get user data
      const user = await this.fetchUserProfile();
      
      return { token, user };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Register a new user
   * @param data Registration data
   * @returns Success message
   */
  async register(data: RegistrationData): Promise<{ message: string }> {
    try {
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.post('/auth/registration/', data);
      return { message: response.data.detail || 'Registration successful' };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    try {
      // Adjust the endpoint to match your Django backend
      // Some Django backends require an API call to invalidate tokens
      await apiClient.post('/auth/logout/');
    } catch (error) {
      // Ignore errors during logout
      console.error('Logout error:', error);
    } finally {
      // Clear stored tokens and user data
      this.clearAuthData();
    }
  },

  /**
   * Request password reset email
   * @param data Email address
   * @returns Success message
   */
  async requestPasswordReset(data: PasswordResetRequestData): Promise<{ message: string }> {
    try {
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.post('/auth/password/reset/', data);
      return { message: response.data.detail || 'Password reset email sent' };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Confirm password reset with token
   * @param data Password reset confirmation data
   * @returns Success message
   */
  async confirmPasswordReset(data: PasswordResetConfirmData): Promise<{ message: string }> {
    try {
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.post('/auth/password/reset/confirm/', data);
      return { message: response.data.detail || 'Password reset successful' };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Refresh authentication token
   * @returns New JWT token
   */
  async refreshToken(): Promise<JwtToken> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.post('/auth/token/refresh/', {
        refresh: refreshToken,
      });
      
      const token: JwtToken = {
        token: response.data.access,
        refreshToken: refreshToken, // Usually refresh tokens don't change on refresh
        expiresIn: 3600, // Adjust based on your token expiration
      };
      
      // Save the new access token
      this.setAuthTokens(token);
      
      return token;
    } catch (error: any) {
      // If refresh fails, clear auth data
      this.clearAuthData();
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Fetch current user profile
   * @returns User data
   */
  async fetchUserProfile(): Promise<UserData> {
    try {
      // Adjust the endpoint to match your Django backend
      const response = await apiClient.get('/users/me/');
      const userData: UserData = response.data;
      
      // Save user data
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      
      return userData;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get current user data from storage
   * @returns User data or null
   */
  getCurrentUser(): UserData | null {
    try {
      const userData = localStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Get authentication token from storage
   * @returns JWT token or null
   */
  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY) || Cookies.get(AUTH_TOKEN_KEY) || null;
  },

  /**
   * Get refresh token from storage
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY) || null;
  },

  /**
   * Save authentication tokens to storage
   * @param token JWT token data
   */
  setAuthTokens(token: JwtToken): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
    
    // Also save in cookies for cross-tab authentication
    Cookies.set(AUTH_TOKEN_KEY, token.token, { expires: 7 });
    Cookies.set(REFRESH_TOKEN_KEY, token.refreshToken, { expires: 30 });
  },

  /**
   * Clear all authentication data from storage
   */
  clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    
    Cookies.remove(AUTH_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};