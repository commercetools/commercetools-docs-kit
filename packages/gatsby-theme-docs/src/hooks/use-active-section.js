import React from 'react';
import throttle from 'lodash.throttle';

const getSectionElements = () =>
  document.querySelectorAll('section[class^="section-h"]');
const getScrollContainer = () => document.querySelector('[role="main"]');
const getHeaderContainer = () => document.querySelector('header');
const getBreadcrumbsContainer = () =>
  document.querySelector('nav[aria-label="Breadcrumbs"]');

const throttleMs = 100;

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = React.useState();

  const onScroll = React.useCallback(
    throttle(() => {
      const sectionElements = getSectionElements();
      let nextActiveSection;
      sectionElements.forEach(section => {
        const headerContainer = getHeaderContainer();
        const breadcrumbsContainer = getBreadcrumbsContainer();
        const offset =
          headerContainer.clientHeight +
          breadcrumbsContainer.clientHeight +
          // "+ 2" makes it aligned with the browser "anchor position"
          2;
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
