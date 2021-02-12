import { createContext, useContext } from 'react';

export const PageTocContext = createContext({});

export const usePageToc = () => useContext(PageTocContext);
