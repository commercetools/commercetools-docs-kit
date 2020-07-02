/* eslint-disable react/prop-types */
import React from 'react';

export const PageMetaDataContext = React.createContext({});

export const usePageMetaData = () => React.useContext(PageMetaDataContext);
