import React from 'react';
import PropTypes from 'prop-types';
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
          breadcrumbs
          beta
          author
          productionHostname
          betaLink
          isSelfLearning
          excludeFromSearchIndex
          products
          contentType
          globalNotification {
            active
            notificationType
            content
          }
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
        <Globals websitePrimaryColor={props.websitePrimaryColor} />
        {props.children}
      </SiteDataContext.Provider>
    </ErrorBoundary>
  );
};
ThemeProvider.propTypes = {
  websitePrimaryColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
