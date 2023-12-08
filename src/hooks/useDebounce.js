import { useState, useEffect } from 'react';

export function useDebounce(callback, delay) {
  const [debouncedValue, setDebouncedValue] = useState(callback);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(callback);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [callback, delay]);

  return debouncedValue;
}
