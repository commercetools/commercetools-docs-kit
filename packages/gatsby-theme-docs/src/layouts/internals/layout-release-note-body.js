import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
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

const ReleaseNoteBody = (props) => (
  <SpacingsStack scale="m">
    <SpacingsStack scale="s">
      <DateElement>{props.date}</DateElement>
      <div
        style={designSystem.tokensToCssVars({
          fontSizeDefault: designSystem.typography.fontSizes.extraSmall,
          fontSizeForStamp: designSystem.typography.fontSizes.extraSmall,
          // Override the `critical` style which is used for the "fix" type
          colorError95: designSystem.colors.light.surfaceForReleaseNoteTypeFix,
          colorError: designSystem.colors.light.borderForReleaseNoteTypeFix,
        })}
      >
        <SpacingsInline>
          <Stamp
            isCondensed
            tone={mapTypeToTone(props)}
            label={mapTypeToLabel(props)}
          />
        </SpacingsInline>
      </div>
      {props.topics.length > 0 && (
        <Topics>
          {props.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </Topics>
      )}
    </SpacingsStack>
    <div>{props.children}</div>
  </SpacingsStack>
);

ReleaseNoteBody.propTypes = {
  date: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  type: PropTypes.oneOf(['feature', 'enhancement', 'fix', 'announcement'])
    .isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.node.isRequired,
};

export default ReleaseNoteBody;

function mapTypeToTone(props) {
  switch (props.type) {
    case 'feature':
      return 'positive';
    case 'enhancement':
      return 'information';
    case 'fix':
      return 'positive';
    case 'announcement':
      return 'primary';
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
    case 'announcement':
      return 'Announcement';
    default:
      return props.type;
  }
}
