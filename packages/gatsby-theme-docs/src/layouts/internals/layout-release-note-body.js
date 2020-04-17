import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import { ThemeProvider as UiKitThemeProvider } from 'emotion-theming';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import Stamp from '@commercetools-uikit/stamp';
import { designSystem } from '@commercetools-docs/ui-kit';

const DateElement = styled.div`
  line-height: ${designSystem.typography.lineHeights.small};
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
const stampTheme = {
  fontSizeDefault: designSystem.typography.fontSizes.extraSmall,
  // Override the `critical` style which is used for the "fix" type
  colorError95: designSystem.colors.light.surfaceForReleaseNoteTypeFix,
  colorError: designSystem.colors.light.borderForReleaseNoteTypeFix,
};

const ReleaseNoteBody = (props) => (
  <SpacingsStack scale="m">
    <DateElement>{props.date}</DateElement>
    <UiKitThemeProvider theme={stampTheme}>
      <SpacingsInline>
        <Stamp tone={mapTypeToTone(props)}>{mapTypeToLabel(props)}</Stamp>
      </SpacingsInline>
    </UiKitThemeProvider>
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

ReleaseNoteBody.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['feature', 'enhancement', 'fix']).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  body: PropTypes.string.isRequired,
};

export default ReleaseNoteBody;

function mapTypeToTone(props) {
  switch (props.type) {
    case 'feature':
      return 'positive';
    case 'enhancement':
      return 'information';
    case 'fix':
      return 'critical';
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
