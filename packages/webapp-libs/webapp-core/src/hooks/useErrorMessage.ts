import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to format error messages for display, with i18n support
 */
export const useErrorMessage = () => {
  const { t } = useTranslation();

  /**
   * Format an error message for display
   * @param error Error object or message
   * @returns Formatted error message
   */
  const getErrorMessage = useCallback((error: any): string => {
    if (!error) {
      return t('common.errors.unknown', 'An unknown error occurred');
    }

    // Handle string errors
    if (typeof error === 'string') {
      return error;
    }

    // Handle Axios errors
    if (error.response) {
      const { data } = error.response;
      
      // Handle string response
      if (typeof data === 'string') {
        return data;
      }
      
      // Handle error with detail field (common in DRF)
      if (data?.detail) {
        return data.detail;
      }
      
      // Handle error with message field
      if (data?.message) {
        return data.message;
      }
      
      // Handle Django-style validation errors
      if (typeof data === 'object') {
        const errorMessages: string[] = [];
        
        // Process error fields
        Object.entries(data).forEach(([field, message]) => {
          if (Array.isArray(message)) {
            errorMessages.push(`${field}: ${message.join(' ')}`);
          } else if (typeof message === 'string') {
            errorMessages.push(`${field}: ${message}`);
          }
        });
        
        if (errorMessages.length > 0) {
          return errorMessages.join('. ');
        }
      }
      
      // Handle HTTP status text as fallback
      if (error.response.statusText) {
        return `${error.response.status} ${error.response.statusText}`;
      }
    }
    
    // Handle error with message property
    if (error.message) {
      return error.message;
    }
    
    // Generic error when all else fails
    return t('common.errors.unknown', 'An unknown error occurred');
  }, [t]);

  return { getErrorMessage };
};