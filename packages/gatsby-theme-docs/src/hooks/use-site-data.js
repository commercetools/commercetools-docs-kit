import { createContext, useContext } from 'react';

export const SiteDataContext = createContext({});

export const useSiteData = () => useContext(SiteDataContext);
