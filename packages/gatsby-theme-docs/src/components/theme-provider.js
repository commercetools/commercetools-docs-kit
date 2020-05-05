import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { useStaticQuery, graphql } from 'gatsby';
import { Reset, Globals } from '@commercetools-docs/ui-kit';
import { SiteDataContext } from '../hooks/use-site-data';
import useAdditionalSiteData from '../overrides/use-additional-site-data';
import ErrorBoundary from './error-boundary';

const ThemeProvider = (props) => {
  const data = useStaticQuery(graphql`
    query GetSiteData {
      site {
        pathPrefix
        siteMetadata {
          title
          description
          author
          productionHostname
          betaLink
        }
      }
    }
  `);
  const additionalData = useAdditionalSiteData();
  const siteData = {
    pathPrefix: data.site.pathPrefix,
    siteMetadata: { ...data.site.siteMetadata, ...additionalData },
  };
  return (
    <IntlProvider locale="en">
      <ErrorBoundary>
        <SiteDataContext.Provider value={siteData}>
          <Reset />
          <Globals />
          {props.children}
        </SiteDataContext.Provider>
      </ErrorBoundary>
    </IntlProvider>
  );
};
ThemeProvider.propTypes = {
  additionalSiteData: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
