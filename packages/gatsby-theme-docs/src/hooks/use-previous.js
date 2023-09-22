import { useEffect, useRef } from 'react';

/** Hook to keep track of previous values of component's state */
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
