/* eslint-disable react/prop-types */
import React from 'react';

export const PageTocContext = React.createContext({});

export const usePageToc = () => React.useContext(PageTocContext);
