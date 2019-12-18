import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import filterOutApiTypeSubtypes from '../../../utils/filter-out-api-subtypes';
import { generateTypeURN } from '../../../utils/ctp-urn';
import { useApiTypes } from '../../../hooks/use-api-types';
import Container from './container';

const ApiType = props => {
  const apiTypes = useApiTypes();

  const matchedApiType = apiTypes.find(apiType => {
    return (
      apiType.apiKey === props.apiKey && apiType.displayName === props.type
    );
  });

  if (!matchedApiType) {
    return (
      <ContentNotifications.Error>{`Type with name '${props.type}' not found in '${props.apiKey}' API`}</ContentNotifications.Error>
    );
  }

  const apiTypeSubTypes = filterOutApiTypeSubtypes(matchedApiType, apiTypes);
  const urn = generateTypeURN(matchedApiType);

  return (
    <div
      css={css`
        margin: 1rem 0;
      `}
      id={urn}
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
