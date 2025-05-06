import qs from 'qs';

/**
 * Get API URL from environment variables
 * @returns API URL with trailing slash
 */
export const getApiUrl = (): string => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';
  
  // Ensure URL ends with a trailing slash
  return apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
};

/**
 * Get GraphQL URL from environment variables
 * @returns GraphQL URL with trailing slash
 */
export const getGraphQLUrl = (): string => {
  const graphqlUrl = process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8000/graphql/';
  
  // Ensure URL ends with a trailing slash
  return graphqlUrl.endsWith('/') ? graphqlUrl : `${graphqlUrl}/`;
};

/**
 * Get WebSocket URL from environment variables
 * @returns WebSocket URL with trailing slash
 */
export const getWsUrl = (): string => {
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws/';
  
  // Ensure URL ends with a trailing slash
  return wsUrl.endsWith('/') ? wsUrl : `${wsUrl}/`;
};

/**
 * Serialize query parameters into a URL-friendly string
 * @param params Object containing query parameters
 * @returns URL-encoded query string
 */
export const serializeParams = (params: Record<string, any>): string => {
  return qs.stringify(params, { arrayFormat: 'brackets' });
};

/**
 * Extract error message from API response
 * @param error Error object from axios or other sources
 * @returns Formatted error message
 */
export const getErrorMessage = (error: any): string => {
  if (!error.response) {
    return error.message || 'Network error';
  }

  const { data } = error.response;
  
  if (typeof data === 'string') {
    return data;
  }
  
  if (data?.detail) {
    return data.detail;
  }
  
  if (data?.message) {
    return data.message;
  }
  
  if (data?.non_field_errors) {
    return data.non_field_errors.join(' ');
  }
  
  // Handle form validation errors
  if (typeof data === 'object') {
    const errors: string[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        errors.push(`${key}: ${value.join(' ')}`);
      } else if (typeof value === 'string') {
        errors.push(`${key}: ${value}`);
      }
    });
    
    if (errors.length > 0) {
      return errors.join('. ');
    }
  }
  
  return 'An unknown error occurred';
};