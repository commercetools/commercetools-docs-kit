import React from 'react';
import useScrollSpy from './use-scroll-spy';

const getSectionElements = () =>
  document.querySelectorAll('section[class^="section-h"]');

/**
 * The function tests if a specific block element is in withing the viewport of the browser.
 * In particular we consider in view an element when:
 * 1. The top of the element is lower than the top margin of the viewport and it is also lower thant the bottom margin of the viewport
 * 2. The top of the element is higher than the top margin of the viewport and the bottom part of the element is lower of the bottom margin of the viewport
 * @param {} element
 * @returns
 */
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();

  return (
    (rect.top >= 0 &&
      rect.top <
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top < 0 && rect.bottom >= 0)
  );
};

const calclulateActiveSection = (
  visibleElements,
  locationHash,
  fallbackElement
) => {
  if (!visibleElements) {
    // should not happen as we always have a section in view, in case we highlight a fallbackElement
    return fallbackElement;
  }
  if (locationHash) {
    // if the url has the a hash, find the matching hash in the visible elements (if exists)
    // otherwise return the first visible element
    return (
      visibleElements.find(
        (element) => element.id === `section-${locationHash.slice(1)}`
      ) || visibleElements[0]
    );
  }
  return visibleElements[0];
};

const useActiveSelection = () => {
  const [activeSection, setActiveSection] = React.useState();

  const onScroll = React.useCallback(() => {
    const sectionElements = getSectionElements();
    const locationHash = window.location.hash;
    const visibleSections = [];
    sectionElements.forEach((section) => {
      if (isInViewport(section)) {
        visibleSections.push(section);
      }
    });
    setActiveSection(
      calclulateActiveSection(visibleSections, locationHash, sectionElements[0])
    );
  }, []);

  useScrollSpy('[role="application"]', onScroll);
  const onHashChange = (event) => {
    if (event.oldURL !== event.newURL) {
      const sectionElements = getSectionElements();
      const pageLocationHash = window.location.hash;
      let elementByHash;
      sectionElements.forEach((section) => {
        if (section.id === `section-${pageLocationHash.slice(1)}`) {
          elementByHash = section;
        }
      });
      if (elementByHash && elementByHash !== activeSection) {
        setActiveSection(elementByHash);
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return activeSection;
};

export default useActiveSelection;
