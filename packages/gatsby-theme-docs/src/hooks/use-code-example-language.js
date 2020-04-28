import React from 'react';

const CodeExampleLanguageContext = React.createContext({
  language: '',
  setLanguage: () => {},
});
CodeExampleLanguageContext.displayName = 'CodeExampleLanguageContext';
export default CodeExampleLanguageContext;
