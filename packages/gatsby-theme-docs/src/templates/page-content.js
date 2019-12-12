import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents, Markdown } from '@commercetools-docs/ui-kit';
import LayoutContent from '../layouts/content';
import { SEO, ThemeProvider } from '../components';
import PlaceholderMarkdownComponents from '../overrides/markdown-components';

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  // Core components
  ...mdxComponents,

  // Custom React components that can be injected from each website
  // See ../overrides/README.md
  ...PlaceholderMarkdownComponents,
};

const PageContentTemplate = props => (
  <ThemeProvider>
    <LayoutContent pageContext={props.pageContext} pageData={props.data.mdx}>
      <MDXProvider components={components}>
        <Markdown.TypographyPage>
          <SEO
            title={props.pageContext.shortTitle || props.pageContext.title}
            excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
          />
          {/* This wrapper div is important to ensure the vertical space */}
          <div>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
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
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PageContentTemplate;

export const query = graphql`
  query QueryMarkdownPage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents(maxDepth: 4)
    }
  }
`;
