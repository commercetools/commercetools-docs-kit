import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Description from './description';
import Children from './children';

const ChildrenUnionLike = (props) => {
  return (
    <SpacingsStack scale="m">
      {props.apiType.description && (
        <Description>{props.apiType.description}</Description>
      )}

      <SpacingsStack scale="m">
        {props.apiTypeSubTypes.map((subType) => (
          <SpacingsStack key={subType.displayName} scale="s">
            <p>
              <strong>{subType.displayName}</strong>
            </p>
            <Children apiKey={props.apiKey} apiType={subType} />
          </SpacingsStack>
        ))}
      </SpacingsStack>
    </SpacingsStack>
  );
};

ChildrenUnionLike.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
  apiTypeSubTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChildrenUnionLike;
