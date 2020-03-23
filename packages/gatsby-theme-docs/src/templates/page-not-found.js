import React from 'react';
import { ThemeProvider } from '../components';
import LayoutNotFound from '../layouts/not-found';

const PageNotFoundTemplate = (props) => (
  <ThemeProvider>
    <LayoutNotFound>
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
    </LayoutNotFound>
  </ThemeProvider>
);

export default PageNotFoundTemplate;
