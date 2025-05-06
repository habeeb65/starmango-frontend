/**
 * User related type definitions
 */

/**
 * User data structure
 */
export interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: UserRole;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

/**
 * User roles
 */
export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
}

/**
 * User profile data
 */
export interface UserProfile {
  id: string;
  user: UserData;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
}

/**
 * User profile update data
 */
export interface UserProfileUpdateData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
}

/**
 * Avatar upload response
 */
export interface AvatarUploadResponse {
  avatar: string;
}