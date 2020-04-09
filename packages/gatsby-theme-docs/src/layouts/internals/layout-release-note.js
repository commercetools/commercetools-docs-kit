import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

const ReleaseNoteTitle = Markdown.withAnchorLink(Markdown.H3);
const DateElement = styled.div`
  line-height: ${designSystem.typography.lineHeights.releaseNoteDate};
`;
const ReleaseNoteType = styled.div`
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.s};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: ${designSystem.typography.lineHeights.releaseNoteDate};
  border: 1px solid transparent;
  border-radius: ${designSystem.tokens.borderRadiusForReleaseNoteType};
  text-transform: capitalize;

  ${getTypeStyles}
`;
const Topics = styled.div`
  color: ${designSystem.colors.light.textInfo};
  font-size: ${designSystem.typography.fontSizes.small};

  > * + * {
    padding-left: ${designSystem.dimensions.spacings.xs};
    margin-left: ${designSystem.dimensions.spacings.xs};
    border-left: 1px solid ${designSystem.colors.light.surfaceSecondary3};
  }
`;

const ReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <ReleaseNoteTitle>{props.title}</ReleaseNoteTitle>
      <DateElement>{props.date}</DateElement>
      <SpacingsInline>
        <ReleaseNoteType type={props.type}>{props.type}</ReleaseNoteType>
      </SpacingsInline>
      {props.topics.length > 0 && (
        <Topics>
          {props.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </Topics>
      )}

      <div>
        <MDXRenderer>{props.body}</MDXRenderer>
      </div>
    </SpacingsStack>
  );
};
ReleaseNote.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['feature', 'enhancement', 'fix']).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  body: PropTypes.string.isRequired,
};

export default ReleaseNote;

function getTypeStyles(props) {
  switch (props.type.toLowerCase()) {
    case 'feature':
      return css`
        background-color: ${designSystem.colors.light
          .surfaceReleaseNoteNewFeatureType};
        border-color: ${designSystem.colors.light
          .borderReleaseNoteNewFeatureType};
      `;
    case 'enhancement':
      return css`
        background-color: ${designSystem.colors.light
          .surfaceReleaseNoteEnhancementType};
        border-color: ${designSystem.colors.light.textInfo};
      `;
    case 'fix':
      return css`
        background-color: ${designSystem.colors.light
          .surfaceReleaseNoteFixType};
        border-color: ${designSystem.colors.light.borderReleaseNoteFixType};
      `;
    default:
      return css``;
  }
}
