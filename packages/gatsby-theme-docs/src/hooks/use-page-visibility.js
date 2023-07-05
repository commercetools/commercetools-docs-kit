import { useState, useEffect } from 'react';

const usePageVisibility = (isEnabled) => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

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
