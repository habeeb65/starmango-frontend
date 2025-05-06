import { useEffect } from 'react';

/**
 * Hook to run a function when a component mounts
 * Similar to useEffect with an empty dependency array
 * @param callback Function to run on mount
 */
export const useMount = (callback: () => void | (() => void)): void => {
  useEffect(() => {
    return callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};