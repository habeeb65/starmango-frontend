/**
 * Authentication related type definitions
 */

export interface JwtToken {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: string;
  username?: string;
  email?: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isStaff: boolean;
  tenantId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface PasswordResetRequestData {
  email: string;
}

export interface PasswordResetConfirmData {
  uid: string;
  token: string;
  password: string;
}

export interface EmailVerificationConfirmData {
  key: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: string | null;
}