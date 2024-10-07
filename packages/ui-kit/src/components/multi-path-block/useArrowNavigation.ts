import React, { useEffect } from 'react';
import { LabelSyncPair } from '.';

export const useArrowNavigation = (labelSyncItems: LabelSyncPair[]) => {
  const [displayStartScroll, setDisplayStartScroll] = React.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = React.useState(false);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const handleScrollButtonStart = (entries: IntersectionObserverEntry[]) => {
    setDisplayStartScroll(!entries[0].isIntersecting);
  };
  const handleScrollButtonEnd = (entries: IntersectionObserverEntry[]) => {
    setDisplayEndScroll(!entries[entries.length - 1].isIntersecting);
  };

  useEffect(() => {
    if (!tabListRef.current?.children) {
      return;
    }

    const tabListChildren = Array.from(tabListRef.current?.children);

    if (
      typeof IntersectionObserver !== 'undefined' &&
      labelSyncItems.length > 0
    ) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[tabListChildren.length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99,
      };

      const firstObserver = new IntersectionObserver(
        handleScrollButtonStart,
        observerOptions
      );
      firstObserver.observe(firstTab);

      const lastObserver = new IntersectionObserver(
        handleScrollButtonEnd,
        observerOptions
      );
      lastObserver.observe(lastTab);

      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }
  }, [labelSyncItems.length]);

  return {
    displayStartScroll,
    displayEndScroll,
    tabsRef,
    tabListRef,
  };
};
