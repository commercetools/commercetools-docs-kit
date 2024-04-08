import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import { PageDataContext } from '../hooks/use-page-data';
import LayoutContentHomepage from '../layouts/content-homepage';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const HomepageTemplate = (props) => (
  <IntlProvider locale="en">
    <ThemeProvider
      websitePrimaryColor={props.data.contentPage.websitePrimaryColor}
    >
      <PageDataContext.Provider value={props.data.contentPage}>
        <LayoutContentHomepage
          pageContext={props.pageContext}
          pageData={props.data.contentPage}
          heroBackground={props.data.heroBackground}
        >
          <MDXProvider components={markdownComponents}>
            <Markdown.TypographyPage>
              {/* This wrapper div is important to ensure the vertical space */}
              <div>
                <MDXRenderer>{props.data.contentPage.body}</MDXRenderer>
              </div>
            </Markdown.TypographyPage>
          </MDXProvider>
        </LayoutContentHomepage>
      </PageDataContext.Provider>
    </ThemeProvider>
  </IntlProvider>
);

HomepageTemplate.displayName = 'HomepageTemplate';
HomepageTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    shortTitle: PropTypes.string,
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    contentPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      websitePrimaryColor: PropTypes.string.isRequired,
      beta: PropTypes.bool.isRequired,
      excludeFromSearchIndex: PropTypes.bool.isRequired,
      allowWideContentLayout: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    heroBackground: PropTypes.shape({
      publicURL: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default HomepageTemplate;

// eslint-disable-next-line react/prop-types
export function Head({ data, pageContext }) {
  return (
    // eslint-disable-next-line react/prop-types
    <ThemeProvider websitePrimaryColor={data.contentPage.websitePrimaryColor}>
      <SEO
        // eslint-disable-next-line react/prop-types
        title={pageContext.shortTitle || data.contentPage.title}
        // eslint-disable-next-line react/prop-types
        excludeFromSearchIndex={data.contentPage.excludeFromSearchIndex}
        // eslint-disable-next-line react/prop-types
        products={data.contentPage.products}
      />
    </ThemeProvider>
  );
}

export const query = graphql`
  query ($slug: String!, $heroBackgroundRelativePath: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      products
      websitePrimaryColor
      beta
      excludeFromSearchIndex
      allowWideContentLayout
      body
    }
    heroBackground: file(relativePath: { eq: $heroBackgroundRelativePath }) {
      publicURL
    }
  }
`;
