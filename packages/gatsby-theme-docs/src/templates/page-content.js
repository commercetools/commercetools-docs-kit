import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutContent from '../layouts/content';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';
import { PageDataContext } from '../hooks/use-page-data';
import ChildSectionsNav from '../components/child-sections-nav';
import UserGuiding from '../components/user-guiding';

const ContentCards = (props) => (
  <markdownComponents.Cards fitContentColumn={true} {...props} />
);

const PageContentTemplate = (props) => (
  <IntlProvider locale="en">
    <ThemeProvider
      websitePrimaryColor={props.data.contentPage.websitePrimaryColor}
    >
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
              {/* This wrapper div is important to ensure the vertical space */}
              <div>
                <MDXRenderer>{props.data.contentPage.body}</MDXRenderer>
              </div>
            </Markdown.TypographyPage>
          </MDXProvider>
        </LayoutContent>
      </PageDataContext.Provider>
    </ThemeProvider>
  </IntlProvider>
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
      planTags: PropTypes.arrayOf(PropTypes.string).isRequired,
      excludeFromSearchIndex: PropTypes.bool.isRequired,
      allowWideContentLayout: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
      navLevels: PropTypes.number.isRequired,
      showTimeToRead: PropTypes.bool.isRequired,
      timeToRead: PropTypes.number.isRequired,
      estimatedTimeToRead: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PageContentTemplate;

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
      />
      <UserGuiding ugId={'U4I78799B6RID'} />
    </ThemeProvider>
  );
}

export const query = graphql`
  query ($slug: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      beta
      planTags
      excludeFromSearchIndex
      allowWideContentLayout
      body
      tableOfContents
      navLevels
      showTimeToRead
      timeToRead
      estimatedTimeToRead
    }
  }
`;
