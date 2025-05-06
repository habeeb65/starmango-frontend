import React from 'react';
import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useUserDisplayName } from '../../hooks/useUser';

interface UserAvatarProps extends Omit<AvatarProps, 'name' | 'src'> {
  /** User's avatar URL */
  src?: string;
  /** User's full name - if not provided, will use the current user's name */
  name?: string;
}

/**
 * Component for displaying a user's avatar
 * Falls back to initials if no avatar URL is provided
 */
export const UserAvatar = ({ src, name, ...avatarProps }: UserAvatarProps) => {
  const currentUserName = useUserDisplayName();
  const displayName = name || currentUserName;
  
  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return '';
    
    // If email, use first character
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase();
    }
    
    // Otherwise get initials from first and last name
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <Avatar
      src={src}
      name={displayName}
      getInitials={() => getInitials(displayName)}
      {...avatarProps}
    />
  );
};

// Avatars of different sizes
export const UserAvatarSm = (props: UserAvatarProps) => <UserAvatar size="sm" {...props} />;
export const UserAvatarMd = (props: UserAvatarProps) => <UserAvatar size="md" {...props} />;
export const UserAvatarLg = (props: UserAvatarProps) => <UserAvatar size="lg" {...props} />;
export const UserAvatarXl = (props: UserAvatarProps) => <UserAvatar size="xl" {...props} />;