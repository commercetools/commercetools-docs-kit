import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutContent from '../layouts/content';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';
import { PageDataContext } from '../hooks/use-page-data';
import ChildSectionsNav from '../components/child-sections-nav';

const ContentCards = (props) => (
  <markdownComponents.Cards fitContentColumn={true} {...props} />
);

const PageContentTemplate = (props) => (
  <ThemeProvider>
    <PageDataContext.Provider value={props.data.contentPage}>
      <LayoutContent
        pageContext={props.pageContext}
        pageData={props.data.contentPage}
      >
        <MDXProvider
          components={{
            ...markdownComponents,
            Cards: ContentCards,
            ChildSectionsNav,
          }}
        >
          <Markdown.TypographyPage>
            <SEO
              title={
                props.pageContext.shortTitle || props.data.contentPage.title
              }
              excludeFromSearchIndex={
                props.data.contentPage.excludeFromSearchIndex
              }
            />
            {/* This wrapper div is important to ensure the vertical space */}
            <div>
              <MDXRenderer>{props.data.contentPage.body}</MDXRenderer>
            </div>
          </Markdown.TypographyPage>
        </MDXProvider>
      </LayoutContent>
    </PageDataContext.Provider>
  </ThemeProvider>
);

PageContentTemplate.displayName = 'PageContentTemplate';
PageContentTemplate.propTypes = {
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
      isGlobalBeta: PropTypes.bool.isRequired,
      excludeFromSearchIndex: PropTypes.bool.isRequired,
      allowGlobalWideContentLayout: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
      navLevels: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PageContentTemplate;

export const query = graphql`
  query QueryContentPage($slug: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      beta
      isGlobalBeta
      excludeFromSearchIndex
      allowGlobalWideContentLayout
      body
      tableOfContents
      navLevels
    }
  }
`;
