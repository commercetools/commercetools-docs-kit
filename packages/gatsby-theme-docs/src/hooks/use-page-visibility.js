import { useState, useEffect } from 'react';
import useIsClientSide from './use-is-client-side';

const usePageVisibility = (isEnabled) => {
  const { isClientSide } = useIsClientSide();
  const [isVisible, setIsVisible] = useState(isClientSide && !document.hidden);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible');
    }

    if (isEnabled) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }
  }, [isEnabled]);

  return isVisible;
};

export default usePageVisibility;
