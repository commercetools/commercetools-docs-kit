import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Reset, Globals } from '@commercetools-docs/ui-kit';
import { SiteDataContext } from '../hooks/use-site-data';
import useAdditionalSiteData from '../overrides/use-additional-site-data';
import CodeExampleLanguageContext from '../hooks/use-code-example-language';
import ErrorBoundary from './error-boundary';

const ThemeProvider = (props) => {
  const [codeExampleLanguage, setCodeExampleLanguage] = React.useState('');

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
        <CodeExampleLanguageContext.Provider
          value={{
            codeExampleLanguage,
            setCodeExampleLanguage,
          }}
        >
          <Reset />
          <Globals />
          {props.children}
        </CodeExampleLanguageContext.Provider>
      </SiteDataContext.Provider>
    </ErrorBoundary>
  );
};
ThemeProvider.propTypes = {
  additionalSiteData: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
