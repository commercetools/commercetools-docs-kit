import { useState, useEffect } from 'react';

const useSelectedLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Read the initial value from local storage
    const initialValue = localStorage.getItem('selected_language');
    setSelectedLanguage(initialValue);

    // Subscribe to changes in local storage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'selected_language') {
        setSelectedLanguage(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateSelectedLanguage = (value: string) => {
    // Update the value in local storage
    localStorage.setItem('selected_language', value);
    setSelectedLanguage(value);
  };

  return { selectedLanguage, updateSelectedLanguage };
};

export default useSelectedLanguage;
