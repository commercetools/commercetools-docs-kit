import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { designSystem } from '@commercetools-docs/ui-kit';
import ApiType from '../../type';

const TitleTypeString = styled.span`
  color: ${designSystem.colors.light.textFaded};
  font-weight: ${designSystem.typography.fontWeights.regular};
`;

const RequestRepresentation = ({ titleSuffix, apiKey, apiType }) => {
  const title = (
    <p>
      {titleSuffix ? `${titleSuffix}: ` : null}
      <TitleTypeString>{apiType}</TitleTypeString>
    </p>
  );
  return (
    <SpacingsStack scale="s">
      <ApiType
        apiKey={apiKey}
        type={apiType}
        renderDescriptionBelowProperties={true}
        propertiesTableTitle={title}
      />
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  titleSuffix: PropTypes.string,
};

export default RequestRepresentation;
