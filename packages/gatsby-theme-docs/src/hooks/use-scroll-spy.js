import { useCallback, useEffect } from 'react';
import throttle from 'lodash.throttle';

const getElement = (selector) => document.querySelector(selector);

const throttleMs = 100;

const useScrollSpy = (selector, callback) => {
  const onScroll = useCallback(
    throttle(() => {
      const element = getElement(selector);
      callback(element);
    }, throttleMs),
    [callback]
  );

  useEffect(() => {
    const element = getElement(selector);
    element.addEventListener('scroll', onScroll);
    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, selector]);
};

export default useScrollSpy;
