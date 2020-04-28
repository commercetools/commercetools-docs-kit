import React from 'react';

const CodeExampleLanguageContext = React.createContext({
  codeExampleLanguage: '',
  setCodeExampleLanguage: () => {},
});
export default CodeExampleLanguageContext;

export const useCodeExampleLanguageContext = () =>
  React.useContext(CodeExampleLanguageContext);
