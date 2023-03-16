// to a significant degree taken over and extended from from https://usehooks.com/useScript/
// provided under the "unlicense" https://github.com/uidotdev/usehooks/blob/master/LICENSE
import { useState, useEffect } from 'react';

type LazyLoadConfigs = {
  script: LazyLoadConfig;
  link: LazyLoadConfig;
};

type LazyLoadConfig = {
  existing: string;
  newElement: 'script' | 'link';
  urlAttribute: 'src' | 'href';
  appendTo: 'body' | 'head';
};

const useLazyLoad = (src: string, type: 'script' | 'link' = 'script') => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(() => {
    const config: LazyLoadConfigs = {
      script: {
        existing: `script[src="${src}"]`,
        newElement: `script`,
        urlAttribute: `src`,
        appendTo: 'body',
      },
      link: {
        existing: `link[href="${src}"]`,
        newElement: `link`,
        urlAttribute: `href`,
        appendTo: 'head',
      },
    };
    // Allow falsy src value if waiting on other data needed for
    // constructing the script URL passed to this hook.
    if (!src) {
      setStatus('idle');
      return;
    }
    // Fetch existing script element by src
    // It may have been added by another intance of this hook
    let existingTag: HTMLScriptElement | null = document.querySelector(
      config[type].existing
    );
    const tag = existingTag || document.createElement(config[type].newElement);

    if (existingTag !== null) {
      // Grab existing script status from attribute and set to state.
      setStatus(existingTag.getAttribute('data-status') || '');
    } else {
      tag.setAttribute(config[type].urlAttribute, src);
      if (type === 'script') {
        (tag as HTMLScriptElement).async = true;
      } else {
        (tag as HTMLLinkElement).rel = 'stylesheet';
      }
      tag.setAttribute('data-status', 'loading');
      // Add script to document body
      document[config[type].appendTo].appendChild(tag);
      // Store status in attribute on script
      // This can be read by other instances of this hook
      const setAttributeFromEvent = (event: Event) => {
        tag.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error'
        );
      };
      tag.addEventListener('load', setAttributeFromEvent);
      tag.addEventListener('error', setAttributeFromEvent);
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    const setStateFromEvent = (event: Event) => {
      console.log('setting status', type, event.type);
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    // Add event listeners
    tag.addEventListener('load', setStateFromEvent);
    tag.addEventListener('error', setStateFromEvent);
    // Remove event listeners on cleanup
    return () => {
      if (tag) {
        tag.removeEventListener('load', setStateFromEvent);
        tag.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src, type]);
  return status;
};

export default useLazyLoad;
