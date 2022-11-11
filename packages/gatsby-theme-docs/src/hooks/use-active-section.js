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

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();

  return (
    (rect.top >= 0 &&
      rect.top <
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top < 0 && rect.bottom >= 0)
  );
};

const useActiveSelection = () => {
  const [activeSection, setActiveSection] = React.useState();
  const onScroll = React.useCallback(() => {
    const sectionElements = getSectionElements();
    let nextActiveSection;
    const visibleSections = [];
    sectionElements.forEach((section) => {
      if (section.getBoundingClientRect().top - offset < 0) {
        nextActiveSection = section;
      }
      if (isInViewport(section)) {
        visibleSections.push(section);
      }
    });
    console.log('visible sections:', visibleSections);
    setActiveSection(nextActiveSection);
  }, []);
  useScrollSpy('[role="application"]', onScroll);

  return activeSection;
};

export default useActiveSelection;
