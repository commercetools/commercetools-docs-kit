import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import filterOutApiTypeSubtypes from '../../../utils/filter-out-api-subtypes';
import { generateTypeURN } from '../../../utils/ctp-urn';
import { useApiTypes } from '../../../hooks/use-api-types';
import Container from './container';

const ApiType = props => {
  const apiTypes = useApiTypes();

  const matchedApiType = apiTypes.find(apiType => {
    return apiType.apiKey === props.apiKey && apiType.name === props.type;
  });

  if (!matchedApiType) {
    throw new Error(`Type with name '${props.type}' not found in API`);
  }

  const apiTypeSubTypes = filterOutApiTypeSubtypes(matchedApiType, apiTypes);

  return (
    <div
      css={css`
        margin: 1rem 0;
      `}
      id={generateTypeURN(matchedApiType)}
    >
      <Container apiType={matchedApiType} apiTypeSubTypes={apiTypeSubTypes} />
    </div>
  );
};

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ApiType;
