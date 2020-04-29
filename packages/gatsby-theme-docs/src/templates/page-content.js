import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutContent from '../layouts/content';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const PageContentTemplate = (props) => (
  <ThemeProvider>
    <LayoutContent
      pageContext={props.pageContext}
      pageData={props.data.contentPage}
    >
      <MDXProvider components={markdownComponents}>
        <Markdown.TypographyPage>
          <SEO
            title={props.pageContext.shortTitle || props.data.contentPage.title}
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
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PageContentTemplate;

export const query = graphql`
  query QueryMarkdownPage($slug: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      beta
      isGlobalBeta
      excludeFromSearchIndex
      body
      tableOfContents(maxDepth: 4)
    }
  }
`;
