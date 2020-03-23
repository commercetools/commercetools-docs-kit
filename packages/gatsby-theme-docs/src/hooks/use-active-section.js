import React from 'react';
import { designSystem } from '@commercetools-docs/ui-kit';
import useScrollSpy from './use-scroll-spy';

const calculateOffset = () => {
  const pxNumber = designSystem.dimensions.heights.header.replace(
    /([0-9]+)px$/,
    '$1'
  );
  return parseInt(pxNumber, 10);
};

const getSectionElements = () =>
  document.querySelectorAll('section[class^="section-h"]');

const offset = calculateOffset();

const useActiveSelection = () => {
  const [activeSection, setActiveSection] = React.useState();
  const onScroll = React.useCallback(() => {
    const sectionElements = getSectionElements();
    let nextActiveSection;
    sectionElements.forEach((section) => {
      if (section.getBoundingClientRect().top - offset < 0) {
        nextActiveSection = section;
      }
    });
    setActiveSection(nextActiveSection);
  }, []);
  useScrollSpy('[role="application"]', onScroll);

  return activeSection;
};

export default useActiveSelection;
