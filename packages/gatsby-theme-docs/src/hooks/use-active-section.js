import React from 'react';
import throttle from 'lodash.throttle';

const throttleMs = 100;
const offset = 49;

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = React.useState();

  const onScroll = React.useCallback(
    throttle(() => {
      const sectionElements = document.querySelectorAll(
        "section[class^='section-h']"
      );
      let nextActiveSection;
      for (let i = 0; i < sectionElements.length; i += 1) {
        const section = sectionElements[i];
        if (section.getBoundingClientRect().top - offset < 0) {
          nextActiveSection = section;
          // eslint-disable-next-line no-continue
          continue;
        }
        // No need to continue loop, if last element has been detected
        break;
      }
      setActiveSection(nextActiveSection);
    }, throttleMs),
    [setActiveSection]
  );

  React.useEffect(() => {
    document
      .querySelector('[role="main"]')
      .addEventListener('scroll', onScroll);
    return () => {
      document
        .querySelector('[role="main"]')
        .removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return activeSection;
};

export default useScrollSpy;
