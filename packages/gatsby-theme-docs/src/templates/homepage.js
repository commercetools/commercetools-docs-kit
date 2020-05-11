import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Markdown } from '@commercetools-docs/ui-kit';
import LayoutContentHomepage from '../layouts/content-homepage';
import { SEO, ThemeProvider } from '../components';
import markdownComponents from '../markdown-components';

const HomepageTemplate = (props) => (
  <ThemeProvider>
    <LayoutContentHomepage
      pageContext={props.pageContext}
      pageData={props.data.contentPage}
      heroBackground={props.data.heroBackground}
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
    </LayoutContentHomepage>
  </ThemeProvider>
);

HomepageTemplate.displayName = 'HomepageTemplate';
HomepageTemplate.propTypes = {
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
    heroBackground: PropTypes.shape({
      publicURL: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default HomepageTemplate;

export const query = graphql`
  query QueryHomepage($slug: String!, $colorPreset: String!) {
    contentPage(slug: { eq: $slug }) {
      title
      websitePrimaryColor
      beta
      isGlobalBeta
      excludeFromSearchIndex
      body
      tableOfContents(maxDepth: 4)
    }
    heroBackground: file(relativePath: { eq: $colorPreset }) {
      publicURL
    }
  }
`;
