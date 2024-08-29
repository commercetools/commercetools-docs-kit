/**
 * Custom hook that manages the selected language state and provides a function to update it.
 * The selected language is stored in local storage and can be updated by dispatching a custom event.
 * The reason for this double mechanism is that local storage event listeners are not triggered by the same window
 * that updates the value. See https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
 *
 * @returns An object containing the selectedLanguage state and the updateSelectedLanguage function.
 */
import { useState, useEffect } from 'react';

const LANGUAGE_LOCAL_STORAGE_KEY = 'selected_language';
const LANGUAGE_CHANGE_EVENT = 'selectedLanguageChange';

const useSelectedLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Read the initial value from local storage
    const initialValue = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    setSelectedLanguage(initialValue);

    // Subscribe to changes in local storage or custom event
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LANGUAGE_LOCAL_STORAGE_KEY) {
        setSelectedLanguage(event.newValue?.toLowerCase() || '');
      }
    };

    const handleCustomEvent = (event: CustomEvent<string>) => {
      setSelectedLanguage(event.detail?.toLowerCase() || '');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      LANGUAGE_CHANGE_EVENT,
      handleCustomEvent as EventListener
    );

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        LANGUAGE_CHANGE_EVENT,
        handleCustomEvent as EventListener
      );
    };
  }, []);

  const updateSelectedLanguage = (inputValue: string) => {
    const value = inputValue.toLowerCase();
    // Update the value in local storage
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, value);
    setSelectedLanguage(value);

    // Dispatch a custom event to notify other components on the same page
    const customEvent = new CustomEvent<string>(LANGUAGE_CHANGE_EVENT, {
      detail: value,
    });
    window.dispatchEvent(customEvent);
  };

  return { selectedLanguage, updateSelectedLanguage };
};

export default useSelectedLanguage;
