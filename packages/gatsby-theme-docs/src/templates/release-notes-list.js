import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNote from '../layouts/internals/layout-release-note';
import LayoutReleaseNotesList from '../layouts/release-notes-list';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';
import extractQueryParameters from '../utils/extract-query-parameters';
import filterReleases from '../utils/filter-releases';

const ReleaseNotesListTemplate = (props) => {
  const location = useLocation();
  const queryParameters = extractQueryParameters(location);
  const filteredReleases = filterReleases(
    props.data.allReleaseNotePage.nodes,
    queryParameters
  );

  return (
    <ThemeProvider>
      <LayoutReleaseNotesList
        pageContext={props.pageContext}
        pageData={props.data.contentPage}
      >
        <Markdown.TypographyPage>
          <SEO
            title={props.data.contentPage.title}
            excludeFromSearchIndex={
              props.data.contentPage.excludeFromSearchIndex
            }
          />
          <MDXProvider components={markdownComponents}>
            <div>
              <MDXRenderer>{props.data.contentPage.body}</MDXRenderer>
            </div>
          </MDXProvider>
          <div id="release-notes-list">
            <SpacingsStack>
              {filteredReleases.map((releaseNote) => (
                <LayoutReleaseNote key={releaseNote.slug} {...releaseNote}>
                  <Markdown.TypographyPage>
                    <section>
                      {markdownFragmentToReact(releaseNote.body)}
                    </section>
                  </Markdown.TypographyPage>
                </LayoutReleaseNote>
              ))}
            </SpacingsStack>
          </div>
        </Markdown.TypographyPage>
      </LayoutReleaseNotesList>
    </ThemeProvider>
  );
};

ReleaseNotesListTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
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
    }).isRequired,
    allReleaseNotePage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
          body: PropTypes.string.isRequired,
          hasMore: PropTypes.bool.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
};

export default ReleaseNotesListTemplate;

export const query = graphql`
  query QueryReleaseOverviewPage($slug: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      beta
      isGlobalBeta
      excludeFromSearchIndex
      body
    }
    allReleaseNotePage(sort: { order: DESC, fields: date }) {
      nodes {
        slug
        title
        date(formatString: "D MMMM YYYY")
        description
        type
        topics
        body: rawExcerpt
        hasMore
      }
    }
  }
`;
