import React from 'react';

const CodeExampleLanguageContext = React.createContext({
  codeExampleLanguage: '',
  setCodeExampleLanguage: () => {},
});
CodeExampleLanguageContext.displayName = 'CodeExampleLanguageContext';
export default CodeExampleLanguageContext;

export const useCodeExampleLanguageContext = () =>
  React.useContext(CodeExampleLanguageContext);
