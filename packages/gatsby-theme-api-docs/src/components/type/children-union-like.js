import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { apiTypeStrings } from '../../utils/constants';
import Children from './children';

const ChildrenUnionLike = ({ apiType, apiTypeSubTypes }) => {
  return (
    <SpacingsStack scale="m">
      <p>{apiType.description}</p>

      <SpacingsStack scale="m">
        {apiTypeSubTypes.map((subType) => (
          <SpacingsStack key={subType.displayName} scale="s">
            <p>
              <strong>{subType.displayName}</strong>
            </p>
            <Children
              apiType={subType}
              parentDiscriminator={apiType.discriminator}
              strings={apiTypeStrings}
            />
          </SpacingsStack>
        ))}
      </SpacingsStack>
    </SpacingsStack>
  );
};

ChildrenUnionLike.propTypes = {
  apiType: PropTypes.object.isRequired,
  apiTypeSubTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChildrenUnionLike;
