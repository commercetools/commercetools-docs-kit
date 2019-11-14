/* eslint-disable react/prop-types */
import React from 'react';

export const SiteDataContext = React.createContext({});

export const useSiteData = () => React.useContext(SiteDataContext);
