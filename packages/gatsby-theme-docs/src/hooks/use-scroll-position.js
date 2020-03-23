import React from 'react';
import useScrollSpy from './use-scroll-spy';

const useScrollPosition = (containerId) => {
  const [position, setPosition] = React.useState(0);
  const onScroll = React.useCallback((element) => {
    setPosition(element.scrollTop);
  }, []);
  useScrollSpy(`#${containerId}`, onScroll);

  return position;
};

export default useScrollPosition;
