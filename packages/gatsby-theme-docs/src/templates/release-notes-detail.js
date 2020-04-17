import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNotesDetail from '../layouts/release-notes-detail';
import LayoutReleaseNoteBody from '../layouts/internals/layout-release-note-body';
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
    <LayoutReleaseNotesDetail pageData={props.data.releaseNotePage}>
      <MDXProvider components={releaseNoteMarkdownComponents}>
        <Markdown.TypographyPage>
          <SEO
            title={props.data.releaseNotePage.title}
            excludeFromSearchIndex={
              props.data.releaseNotePage.excludeFromSearchIndex
            }
          />
          <div>
            <LayoutReleaseNoteBody {...props.data.releaseNotePage} />
          </div>
        </Markdown.TypographyPage>
      </MDXProvider>
    </LayoutReleaseNotesDetail>
  </ThemeProvider>
);

ReleaseNotesDetailTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    releaseNotePage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      isGlobalBeta: PropTypes.bool.isRequired,
      excludeFromSearchIndex: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReleaseNotesDetailTemplate;

export const query = graphql`
  query QueryReleaseDetailPage($slug: String!) {
    releaseNotePage(slug: { eq: $slug }) {
      title
      isGlobalBeta
      excludeFromSearchIndex
      date(formatString: "D MMMM YYYY")
      description
      type
      topics
      body
    }
  }
`;
