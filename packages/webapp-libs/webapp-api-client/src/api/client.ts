import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getApiUrl } from './helpers';

/**
 * Creates a configured axios instance for API requests
 * @param config Additional axios configuration options
 * @returns Axios instance
 */
export const createApiClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  return client;
};

// Default API client instance
export const apiClient = createApiClient();