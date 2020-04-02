import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutReleaseNotes from '../layouts/release-notes';
import { SEO, ThemeProvider } from '../components';

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  // TODO: decide how to map the components to markdown elements.
};

const ReleaseNotesTemplate = (props) => (
  <ThemeProvider>
    <LayoutReleaseNotes pageContext={props.pageContext}>
      <MDXProvider components={components}>
        <Markdown.TypographyPage>
          <SEO
            title={props.pageContext.title}
            excludeFromSearchIndex={props.pageContext.excludeFromSearchIndex}
          />
          <div>
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </div>
          <div>
            {props.data.allReleaseNotes &&
              props.data.allReleaseNotes.nodes &&
              props.data.allReleaseNotes.nodes.map(({ childMdx }, index) => (
                <div key={index}>
                  <Markdown.H2>{childMdx.fields.title}</Markdown.H2>
                  <div>
                    <MDXRenderer>{childMdx.body}</MDXRenderer>
                  </div>
                </div>
              ))}
          </div>
        </Markdown.TypographyPage>
      </MDXProvider>
    </LayoutReleaseNotes>
  </ThemeProvider>
);

ReleaseNotesTemplate.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excludeFromSearchIndex: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
    }).isRequired,
    allReleaseNotes: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          childMdx: PropTypes.shape({
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
          }),
        })
      ).isRequired,
    }),
  }).isRequired,
};

export default ReleaseNotesTemplate;

export const query = graphql`
  query QueryReleasesPage($slug: String!, $isOverviewPage: Boolean!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
    }
    allReleaseNotes: allFile(
      filter: {
        sourceInstanceName: { eq: "releases" }
        internal: { mediaType: { eq: "text/mdx" } }
        name: { ne: "index" }
      }
    ) @include(if: $isOverviewPage) {
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
