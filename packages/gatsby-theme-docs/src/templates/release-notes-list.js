import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import moment from 'moment';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNote from '../layouts/internals/layout-release-note';
import LayoutReleaseNotesList from '../layouts/release-notes-list';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const ReleaseNotesListTemplate = (props) => {
  const [releaseNotes, setReleaseNotes] = React.useState(
    props.data.allReleaseNotePage ? props.data.allReleaseNotePage.nodes : []
  );
  const [fromFilterDate, setFromFilterDate] = React.useState('');
  const [toFilterDate, setToFilterDate] = React.useState('');
  const [filterTopics, setFilterTopics] = React.useState([]);

  React.useEffect(() => {
    // will not execute on first render
    if (fromFilterDate || toFilterDate || filterTopics.length > 0) {
      setReleaseNotes(
        props.data.allReleaseNotePage.nodes.filter((releaseNote) => {
          let releaseNoteDateIsSameOrAfterFromFilterDate = true;
          let releaseNoteDateIsSameOrBeforeToFilterDate = true;
          let foundTopicInFilter = true;

          if (fromFilterDate) {
            releaseNoteDateIsSameOrAfterFromFilterDate = moment(
              releaseNote.date,
              'D MMMM YYYY'
            ).isSameOrAfter(moment(fromFilterDate, 'YYYY-MM-DD'));
          }

          if (toFilterDate) {
            releaseNoteDateIsSameOrBeforeToFilterDate = moment(
              releaseNote.date,
              'D MMMM YYYY'
            ).isSameOrBefore(moment(toFilterDate, 'YYYY-MM-DD'));
          }

          if (filterTopics.length > 0) {
            foundTopicInFilter = releaseNote.topics.find((topic) =>
              filterTopics.includes(topic)
            );
          }

          return (
            releaseNoteDateIsSameOrAfterFromFilterDate &&
            releaseNoteDateIsSameOrBeforeToFilterDate &&
            foundTopicInFilter
          );
        })
      );
    } else if (
      releaseNotes.length !== props.data.allReleaseNotePage.nodes.length
    ) {
      // this is not the first render but filters are empty
      setReleaseNotes(props.data.allReleaseNotePage.nodes);
    }
  }, [
    releaseNotes.length,
    props.data.allReleaseNotePage.nodes,
    fromFilterDate,
    toFilterDate,
    filterTopics,
  ]);

  return (
    <ThemeProvider>
      <LayoutReleaseNotesList
        pageContext={props.pageContext}
        pageData={props.data.contentPage}
        onFromFilterDateChange={setFromFilterDate}
        onToFilterDateChange={setToFilterDate}
        onFilterTopicsChange={setFilterTopics}
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
          <div>
            <SpacingsStack>
              {releaseNotes.map((releaseNote) => (
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
