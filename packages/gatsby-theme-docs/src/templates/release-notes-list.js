import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNote from '../layouts/internals/layout-release-note';
import LayoutReleaseNotesList from '../layouts/release-notes-list';
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

const ReleaseNotesListTemplate = (props) => (
  <ThemeProvider>
    <LayoutReleaseNotesList pageContext={props.pageContext}>
      <Markdown.TypographyPage>
        <SEO
          title={props.pageContext.title}
          excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
        />
        <MDXProvider components={markdownComponents}>
          <div>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </div>
        </MDXProvider>
        <div>
          <MDXProvider components={releaseNoteMarkdownComponents}>
            <SpacingsStack>
              {props.data.allReleaseNotes &&
                props.data.allReleaseNotes.nodes &&
                props.data.allReleaseNotes.nodes.map(({ childMdx }) => (
                  <LayoutReleaseNote
                    key={childMdx.slug}
                    title={childMdx.fields.title}
                    body={childMdx.body}
                  />
                ))}
            </SpacingsStack>
          </MDXProvider>
        </div>
      </Markdown.TypographyPage>
    </LayoutReleaseNotesList>
  </ThemeProvider>
);

ReleaseNotesListTemplate.propTypes = {
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
    allReleaseNotes: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          childMdx: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
            body: PropTypes.string.isRequired,
          }),
        })
      ).isRequired,
    }),
  }).isRequired,
};

export default ReleaseNotesListTemplate;

export const query = graphql`
  query QueryReleaseOverviewPage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
    }
    allReleaseNotes: allFile(
      filter: {
        sourceInstanceName: { eq: "releases" }
        internal: { mediaType: { eq: "text/mdx" } }
        name: { ne: "index" }
      }
    ) {
      nodes {
        childMdx {
          id
          fields {
            slug
            title
          }
          body
        }
        name
      }
    }
  }
`;
