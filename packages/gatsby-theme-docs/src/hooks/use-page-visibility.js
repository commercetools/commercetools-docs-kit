import { useState, useEffect } from 'react';

const usePageVisibility = (isEnabled) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible');
    }

    if (isEnabled) {
      setIsVisible(document.visibilityState === 'visible');
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
