import { useState, useCallback } from 'react';
import useScrollSpy from './use-scroll-spy';

const useScrollPosition = (containerId) => {
  const [position, setPosition] = useState(0);
  const onScroll = useCallback((element) => {
    setPosition(element.scrollTop);
  }, []);
  useScrollSpy(`#${containerId}`, onScroll);

  return position;
};

export default useScrollPosition;
