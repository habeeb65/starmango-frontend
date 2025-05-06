import { gql } from '@apollo/client';

/**
 * GraphQL fragments for common data structures
 * These will be customized based on your Django GraphQL schema
 */

// User fragment for common user fields
export const USER_FRAGMENT = gql`
  fragment UserFragment on UserType {
    id
    email
    firstName
    lastName
    isActive
    isStaff
  }
`;

// Tenant fragment for multi-tenancy support
export const TENANT_FRAGMENT = gql`
  fragment TenantFragment on TenantType {
    id
    name
    slug
    isActive
  }
`;

// Profile fragment
export const PROFILE_FRAGMENT = gql`
  fragment ProfileFragment on ProfileType {
    id
    user {
      ...UserFragment
    }
    avatar
    bio
  }
  ${USER_FRAGMENT}
`;

// These fragments can be customized based on your actual GraphQL schema
// Add more fragments as needed for your specific data structures