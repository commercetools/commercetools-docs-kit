import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import filterOutApiTypeSubtypes from '../../utils/filter-out-api-subtypes';
import { generateTypeURN } from '../../utils/ctp-urn';
import { useApiTypes } from '../../hooks/use-api-types';
import { apiTypeStrings } from '../../utils/constants';
import Children from './children';
import ChildrenUnionLike from './children-union-like';

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
    <div id={urn}>
      {matchedApiType.oneOf ? (
        <ChildrenUnionLike
          apiType={matchedApiType}
          apiTypeSubTypes={apiTypeSubTypes}
        />
      ) : (
        <Children
          apiType={matchedApiType}
          strings={apiTypeStrings}
          renderDescriptionBelowProperties={
            props.renderDescriptionBelowProperties
          }
          propertiesTableTitle={props.propertiesTableTitle}
        />
      )}
    </div>
  );
};

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  renderDescriptionBelowProperties: PropTypes.bool,
  propertiesTableTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default ApiType;
