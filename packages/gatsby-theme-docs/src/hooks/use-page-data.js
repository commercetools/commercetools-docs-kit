/* eslint-disable react/prop-types */
import React from 'react';

export const PageDataContext = React.createContext({});

export const usePageData = () => React.useContext(PageDataContext);
