import { get, omit, pick } from 'lodash';

/**
 * Safely get a property from an object with a default value
 * @param obj Object to get property from
 * @param path Path to the property
 * @param defaultValue Default value if property is not found
 * @returns Property value or default value
 */
export const getProperty = <T>(obj: any, path: string, defaultValue?: T): T => {
  return get(obj, path, defaultValue) as T;
};

/**
 * Create a new object with only the specified properties
 * @param obj Source object
 * @param keys Properties to include
 * @returns New object with only the specified properties
 */
export const pickProperties = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return pick(obj, keys) as Pick<T, K>;
};

/**
 * Create a new object without the specified properties
 * @param obj Source object
 * @param keys Properties to exclude
 * @returns New object without the specified properties
 */
export const omitProperties = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  return omit(obj, keys) as Omit<T, K>;
};

/**
 * Remove null and undefined values from an object
 * @param obj Object to clean
 * @returns New object without null and undefined values
 */
export const removeEmpty = <T extends object>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {}) as Partial<T>;
};

/**
 * Check if an object is empty
 * @param obj Object to check
 * @returns True if object is empty
 */
export const isEmpty = (obj: any): boolean => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

/**
 * Deep merge two objects
 * @param target Target object
 * @param source Source object
 * @returns Merged object
 */
export const deepMerge = <T extends object>(target: T, source: Partial<T>): T => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceKey = key as keyof typeof source;
      const targetKey = key as keyof typeof target;
      
      if (isObject(source[sourceKey]) && key in target) {
        // @ts-ignore
        output[targetKey] = deepMerge(target[targetKey], source[sourceKey]);
      } else {
        // @ts-ignore
        output[targetKey] = source[sourceKey];
      }
    });
  }
  
  return output;
};

/**
 * Check if a value is an object
 * @param item Value to check
 * @returns True if value is an object
 */
const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};