import React from 'react';
import throttle from 'lodash.throttle';
import { designSystem } from '@commercetools-docs/ui-kit';

const calculateOffset = () => {
  const pxNumber = designSystem.dimensions.heights.header.replace(
    /([0-9]+)px$/,
    '$1'
  );
  return parseInt(pxNumber, 10);
};

const getSectionElements = () =>
  document.querySelectorAll('section[class^="section-h"]');
const getScrollContainer = () => document.querySelector('[role="application"]');

const throttleMs = 100;
const offset = calculateOffset();

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = React.useState();

  const onScroll = React.useCallback(
    throttle(() => {
      const sectionElements = getSectionElements();
      let nextActiveSection;
      sectionElements.forEach(section => {
        if (section.getBoundingClientRect().top - offset < 0) {
          nextActiveSection = section;
        }
      });
      setActiveSection(nextActiveSection);
    }, throttleMs),
    [setActiveSection]
  );

  React.useEffect(() => {
    const container = getScrollContainer();
    container.addEventListener('scroll', onScroll);
    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return activeSection;
};

export default useScrollSpy;
