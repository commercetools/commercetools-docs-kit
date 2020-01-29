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
    return doIfMissingType(props.type, props.apiKey);
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

function doIfMissingType(type, apiKey) {
  const errorMsg = `Type with name '${type}' not found in '${apiKey}' API`;

  if (__DEVELOPMENT__) {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

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
