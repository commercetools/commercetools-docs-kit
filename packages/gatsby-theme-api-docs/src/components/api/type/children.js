import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const Children = ({ apiType, parentDiscriminator, strings }) => (
  <SpacingsStack scale="m">
    {apiType.enumeration || apiType.description ? (
      <Enum
        description={{
          text: apiType.description,
        }}
        values={apiType.enumeration}
      />
    ) : null}

    {apiType.properties ? (
      <Properties apiType={apiType} parentDiscriminator={parentDiscriminator} />
    ) : null}

    {apiType.examples ? (
      <Examples
        examples={apiType.examples}
        title={apiType.examples.length > 1 ? strings.examples : strings.example}
      />
    ) : null}
  </SpacingsStack>
);

Children.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  strings: PropTypes.object,
};

export default Children;
