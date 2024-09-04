/**
 * Custom hook that manages (for multi paths/languages components) the selected path state and provides a function to update it.
 * The selected path is stored in local storage and can be updated by dispatching a custom event.
 * The selected path is also reflected in the URL query string. If a query string activePath parameter is present on page load,
 * then it overrides the local storage value.
 * The reason for this double mechanism is that local storage event listeners are not triggered by the same window
 * that updates the value. See https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
 *
 * @returns An object containing the selectedPath state and the updateSelectedPath function.
 */
import { useState, useEffect } from 'react';

const PATH_LOCAL_STORAGE_KEY = 'selected_path';
const PATH_CHANGE_EVENT = 'selectedPathChange';
const ACTIVE_PATH_PARAM_NAME = 'activePath';

const useSelectedPath = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    // Read the initial value from local storage
    const urlParams = new URLSearchParams(window.location.search);
    const activePath = urlParams.get(ACTIVE_PATH_PARAM_NAME);
    // if a query string activePath parameter is present, then override the local storage value
    if (activePath) {
      localStorage.setItem(PATH_LOCAL_STORAGE_KEY, activePath);
    }
    const initialValue = localStorage.getItem(PATH_LOCAL_STORAGE_KEY);
    setSelectedPath(initialValue);

    // Subscribe to changes in local storage or custom event
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PATH_LOCAL_STORAGE_KEY) {
        setSelectedPath(event.newValue?.toLowerCase() || '');
      }
    };

    const handleCustomEvent = (event: CustomEvent<string>) => {
      setSelectedPath(event.detail?.toLowerCase() || '');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      PATH_CHANGE_EVENT,
      handleCustomEvent as EventListener
    );

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        PATH_CHANGE_EVENT,
        handleCustomEvent as EventListener
      );
    };
  }, []);

  const updateSelectedPath = (inputValue: string) => {
    const value = inputValue.toLowerCase();
    // Update the value in local storage
    localStorage.setItem(PATH_LOCAL_STORAGE_KEY, value);
    setSelectedPath(value);

    // Update the activePath query string parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (value.length > 0) {
      urlParams.set(ACTIVE_PATH_PARAM_NAME, value);
    }
    const hasQueryParams = urlParams.size > 0;
    const newLocation = !hasQueryParams
      ? window.location.pathname
      : `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, '', newLocation);

    // Dispatch a custom event to notify other components on the same page
    const customEvent = new CustomEvent<string>(PATH_CHANGE_EVENT, {
      detail: value,
    });
    window.dispatchEvent(customEvent);
  };

  return { selectedPath, updateSelectedPath };
};

export default useSelectedPath;
