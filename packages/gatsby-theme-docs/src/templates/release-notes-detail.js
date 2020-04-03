import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNotesDetail from '../layouts/release-notes-detail';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const releaseNoteMarkdownComponents = {
  ...markdownComponents,
  // NOTE: release notes content can only have headings starting from h4.
  h1: Markdown.withAnchorLink(Markdown.H4),
  h2: Markdown.withAnchorLink(Markdown.H5),
  h3: Markdown.withAnchorLink(Markdown.H6),
  h4: Markdown.withAnchorLink(Markdown.H6),
};

const ReleaseNotesDetailTemplate = (props) => (
  <ThemeProvider>
    <LayoutReleaseNotesDetail pageContext={props.pageContext}>
      <MDXProvider components={releaseNoteMarkdownComponents}>
        <Markdown.TypographyPage>
          <SEO
            title={props.pageContext.title}
            excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
          />
          <div>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </div>
        </Markdown.TypographyPage>
      </MDXProvider>
    </LayoutReleaseNotesDetail>
  </ThemeProvider>
);

ReleaseNotesDetailTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    beta: PropTypes.bool.isRequired,
    isGlobalBeta: PropTypes.bool.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
    hasReleaseNotes: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReleaseNotesDetailTemplate;

export const query = graphql`
  query QueryReleaseDetailPage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
    }
  }
`;
