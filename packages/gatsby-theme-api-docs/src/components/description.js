import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import transformURNLinksPlugin from '../utils/transform-urn-links-plugin';

const DescriptionParagraphContainer = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
`;

const DescriptionTextContainer = styled.span`
  display: inline-block;
`;

// A pure description string that takes a markdown string
// as a property. Use this to embed description into a layout like
// a table, card or bullet list.
export const DescriptionText = (props) => (
  <DescriptionTextContainer>
    {markdownFragmentToReact(props.markdownString, {}, transformURNLinksPlugin)}
  </DescriptionTextContainer>
);

// A full width body text paragraph that takes either a markdown string
// or pre-rendered react components
export const DescriptionParagraph = (props) => {
  return (
    <DescriptionParagraphContainer>
      {typeof props.children === 'string' ? (
        <Markdown.TypographyContainer>
          <DescriptionText markdownString={props.children} />
        </Markdown.TypographyContainer>
      ) : (
        props.children
      )}
    </DescriptionParagraphContainer>
  );
};

DescriptionText.propTypes = {
  markdownString: PropTypes.string,
};
DescriptionParagraph.propTypes = {
  children: PropTypes.node,
};
