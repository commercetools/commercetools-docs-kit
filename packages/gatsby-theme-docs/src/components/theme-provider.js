import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import {
  SiteDataContext,
  Reset,
  Globals,
  ErrorBoundary,
} from '@commercetools-docs/ui-kit';
import useAdditionalSiteData from '../overrides/use-additional-site-data';

const ThemeProvider = props => {
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
    <ErrorBoundary>
      <SiteDataContext.Provider value={siteData}>
        <Reset />
        <Globals />
        {props.children}
      </SiteDataContext.Provider>
    </ErrorBoundary>
  );
};
ThemeProvider.propTypes = {
  additionalSiteData: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
