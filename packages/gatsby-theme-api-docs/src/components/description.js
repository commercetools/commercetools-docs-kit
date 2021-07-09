import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { visit } from 'unist-util-visit';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import { markdownFragmentToReact } from '@commercetools-docs/gatsby-theme-docs';
import { useTypeLocations, locationForType } from '../hooks/use-type-locations';
import { parseTypeURN } from '../utils/ctp-urn';

const DescriptionParagraphContainer = styled.div`
  max-width: ${designSystem.dimensions.widths.pageContent};
`;

const DescriptionTextContainer = styled.span`
  display: inline-block;
`;

// a custom remark plugin that resolves URN style links from RAML descriptions to URLs
const transformURNLinksPlugin = () => (ast) => {
  const typeLocations = useTypeLocations();
  visit(ast, 'link', (node) => {
    const typeUrn = parseTypeURN(node.url);
    if (typeUrn !== false) {
      const typeUrl = locationForType(
        typeUrn.apiKey,
        typeUrn.name,
        typeLocations
      );
      node.url =
        typeUrl.url && typeof typeUrl.url === 'string'
          ? typeUrl.url
          : 'Content Error - type location not found for: ' + node.url;
    }
  });
};

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
