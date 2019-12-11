import React from 'react';
import PropTypes from 'prop-types';
import { apiTypeStrings } from '../../../utils/constants';
import Children from './children';
import ChildrenUnionLike from './children-union-like';

const Container = ({ apiType, apiTypeSubTypes }) => {
  return apiType.unionLike ? (
    <ChildrenUnionLike
      apiType={apiType}
      apiTypeSubTypes={apiTypeSubTypes}
      strings={apiTypeStrings}
    />
  ) : (
    <Children apiType={apiType} strings={apiTypeStrings} />
  );
};

Container.propTypes = {
  apiType: PropTypes.object.isRequired,
  apiTypeSubTypes: PropTypes.array,
};

export default Container;
