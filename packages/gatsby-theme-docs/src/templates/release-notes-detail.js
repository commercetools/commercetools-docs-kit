import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNotesDetail from '../layouts/release-notes-detail';
import LayoutReleaseNoteBody from '../layouts/internals/layout-release-note-body';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const releaseNoteMarkdownComponents = {
  ...markdownComponents,
  // NOTE: release notes content can only have headings starting from h4.
  h1: Markdown.withCopyToClipboard(Markdown.H4),
  h2: Markdown.withCopyToClipboard(Markdown.H5),
  h3: Markdown.withCopyToClipboard(Markdown.H6),
  h4: Markdown.withCopyToClipboard(Markdown.H6),
};

const ReleaseNotesDetailTemplate = (props) => (
  <IntlProvider locale="en">
    <ThemeProvider
      websitePrimaryColor={props.data.releaseNotePage.websitePrimaryColor}
    >
      <LayoutReleaseNotesDetail pageData={props.data.releaseNotePage}>
        <MDXProvider components={releaseNoteMarkdownComponents}>
          <Markdown.TypographyPage>
            <div>
              <LayoutReleaseNoteBody {...props.data.releaseNotePage}>
                <MDXRenderer>{props.data.releaseNotePage.body}</MDXRenderer>
              </LayoutReleaseNoteBody>
            </div>
          </Markdown.TypographyPage>
        </MDXProvider>
      </LayoutReleaseNotesDetail>
    </ThemeProvider>
  </IntlProvider>
);

ReleaseNotesDetailTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    releaseNotePage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      websitePrimaryColor: PropTypes.string.isRequired,
      excludeFromSearchIndex: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReleaseNotesDetailTemplate;

// eslint-disable-next-line react/prop-types
export function Head({ data }) {
  return (
    <ThemeProvider
      // eslint-disable-next-line react/prop-types
      websitePrimaryColor={data.releaseNotePage.websitePrimaryColor}
    >
      <SEO
        // eslint-disable-next-line react/prop-types
        title={data.releaseNotePage.title}
        // eslint-disable-next-line react/prop-types
        excludeFromSearchIndex={data.releaseNotePage.excludeFromSearchIndex}
      />
    </ThemeProvider>
  );
}

export const query = graphql`
  query ($slug: String!) {
    releaseNotePage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      excludeFromSearchIndex
      date(formatString: "D MMMM YYYY")
      description
      type
      topics
      body
    }
  }
`;
