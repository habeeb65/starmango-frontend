/**
 * Environment variable utilities
 * Provides type-safe access to environment variables
 */

/**
 * Get environment variable with default value
 * @param name Environment variable name
 * @param defaultValue Default value if environment variable is not set
 * @returns Environment variable value or default value
 */
export const getEnv = (name: string, defaultValue = ''): string => {
  return (process.env[name] || defaultValue) as string;
};

/**
 * Environment variables used in the application
 */
export const Env = {
  // API and Backend URLs
  API_URL: getEnv('REACT_APP_API_URL', 'http://localhost:8000/api/'),
  GRAPHQL_URL: getEnv('REACT_APP_GRAPHQL_URL', 'http://localhost:8000/graphql/'),
  WS_URL: getEnv('REACT_APP_WS_URL', 'ws://localhost:8000/ws/'),
  
  // Feature flags
  FEATURE_MULTI_TENANCY: getEnv('REACT_APP_FEATURE_MULTI_TENANCY', 'true') === 'true',
  FEATURE_SUBSCRIPTIONS: getEnv('REACT_APP_FEATURE_SUBSCRIPTIONS', 'true') === 'true',
  
  // Stripe integration
  STRIPE_PUBLISHABLE_KEY: getEnv('REACT_APP_STRIPE_PUBLISHABLE_KEY', ''),
  
  // Application environment
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  IS_DEV: getEnv('NODE_ENV', 'development') === 'development',
  IS_PROD: getEnv('NODE_ENV', 'development') === 'production',
  IS_TEST: getEnv('NODE_ENV', 'development') === 'test',
};