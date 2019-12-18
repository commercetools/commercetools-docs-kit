import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import {
  Markdown,
  Subtitle,
  ContentNotifications,
} from '@commercetools-docs/ui-kit';
import LayoutContent from '../layouts/content';
import { SEO, Link, ThemeProvider } from '../components';
import PlaceholderMarkdownComponents from '../overrides/markdown-components';

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  // UI components
  p: Markdown.Paragraph,
  // NOTE: we want to ensure that only one h1 exists on each page.
  // Therefore, we map the markdown header elements starting from h2.
  // The h1 header will be automatically rendered based on the page title.
  h1: Markdown.withAnchorLink(Markdown.H2),
  h2: Markdown.withAnchorLink(Markdown.H3),
  h3: Markdown.withAnchorLink(Markdown.H4),
  h4: Markdown.withAnchorLink(Markdown.H5),
  h5: Markdown.withAnchorLink(Markdown.H6),
  h6: Markdown.withAnchorLink(Markdown.H6),
  thematicBreak: Markdown.ThematicBreak,
  blockquote: Markdown.Blockquote,
  ul: Markdown.Ul,
  ol: Markdown.Ol,
  li: Markdown.Li,
  dl: Markdown.Dl,
  dt: Markdown.Dt,
  dd: Markdown.Dd,
  table: Markdown.Table,
  tr: Markdown.TableRow,
  td: Markdown.TableCell,
  th: Markdown.TableHeader,
  code: Markdown.InlineCode,
  inlineCode: Markdown.InlineCode,
  em: Markdown.Em,
  strong: Markdown.Strong,
  delete: Markdown.Delete,
  hr: Markdown.Hr,
  pre: Markdown.CodeBlock,
  // Custom component specific to the Gatsby theme
  a: Link,

  // Official react components to be used in MDX files
  Subtitle,
  Info: ContentNotifications.Info,
  Warning: ContentNotifications.Warning,
  Error: ContentNotifications.Error,

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
