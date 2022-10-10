import { createContext, useContext } from 'react';

export const PageDataContext = createContext({});

export const usePageData = () => useContext(PageDataContext);
