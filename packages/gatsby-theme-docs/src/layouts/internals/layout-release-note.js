import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import Stamp from '@commercetools-uikit/stamp';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

const DateElement = styled.div`
  line-height: ${designSystem.typography.lineHeights.small};
`;
// Wraps the uikit `Stamp` component to allow custom color schemes.
// The `> div` selector should target the `Stamp` container element.
const ReleaseNoteType = styled.div`
  > div {
    color: ${designSystem.colors.light.textPrimary};
    line-height: ${designSystem.typography.lineHeights.small};
    font-size: ${designSystem.typography.fontSizes.extraSmall};
    ${getTypeStyles}
  }
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
      <Markdown.H3>{props.title}</Markdown.H3>
      <DateElement>{props.date}</DateElement>
      <SpacingsInline>
        <ReleaseNoteType type={props.type}>
          <Stamp tone={mapTypeToTone(props)}>{mapTypeToLabel(props)}</Stamp>
        </ReleaseNoteType>
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
  switch (props.type) {
    // TODO: provide this color in the uikit?
    case 'fix':
      return css`
        background-color: ${designSystem.colors.light
          .surfaceForReleaseNoteTypeFix};
        border: 1px solid
          ${designSystem.colors.light.borderForReleaseNoteTypeFix};
      `;
    default:
      return css``;
  }
}

function mapTypeToTone(props) {
  switch (props.type) {
    case 'feature':
      return 'positive';
    case 'enhancement':
      return 'information';
    default:
      return props.type;
  }
}

function mapTypeToLabel(props) {
  switch (props.type) {
    case 'feature':
      return 'Feature';
    case 'enhancement':
      return 'Enhancement';
    case 'fix':
      return 'Resolved Issue';
    default:
      return props.type;
  }
}
