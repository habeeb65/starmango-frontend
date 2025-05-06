import { camelCase, kebabCase, snakeCase, startCase } from 'lodash';

/**
 * Truncate a string to a specified length and add an ellipsis
 * @param str String to truncate
 * @param length Maximum length of the string
 * @param omission String to use as ellipsis
 * @returns Truncated string
 */
export const truncate = (str: string, length = 100, omission = '...'): string => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.slice(0, length - omission.length) + omission;
};

/**
 * Capitalize the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert a string to title case
 * @param str String to convert
 * @returns Title case string
 */
export const toTitleCase = (str: string): string => {
  return startCase(str);
};

/**
 * Convert a string to camel case
 * @param str String to convert
 * @returns Camel case string
 */
export const toCamelCase = (str: string): string => {
  return camelCase(str);
};

/**
 * Convert a string to kebab case
 * @param str String to convert
 * @returns Kebab case string
 */
export const toKebabCase = (str: string): string => {
  return kebabCase(str);
};

/**
 * Convert a string to snake case
 * @param str String to convert
 * @returns Snake case string
 */
export const toSnakeCase = (str: string): string => {
  return snakeCase(str);
};

/**
 * Generate a random string of specified length
 * @param length Length of the string
 * @returns Random string
 */
export const randomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Slugify a string for use in URLs
 * @param str String to slugify
 * @returns Slugified string
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};