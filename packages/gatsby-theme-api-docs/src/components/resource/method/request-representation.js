import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInlie from '@commercetools-uikit/spacings-inline';
import {
  useTypeLocations,
  locationForType,
} from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import ApiTypeByKey from '../../type/type-by-api-key';
import Title from './title';
import ContentType from './highlights';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();
  const requestRepresentationLocation = locationForType(
    props.apiKey,
    props.apiType,
    typeLocations
  );

  return (
    <SpacingsStack scale="xs">
      <Title>Request Body:</Title>
      {!props.isStructuredDataType ? (
        <SpacingsInlie>
          {props.contentType.map((type, index) => {
            if (index === 0) {
              return <ContentType key={index}>{type}</ContentType>;
            }
            return (
              <>
                <span>or</span>
                <ContentType key={index}>{type}</ContentType>
              </>
            );
          })}
          <span>The file to upload.</span>
        </SpacingsInlie>
      ) : requestRepresentationLocation ? (
        <SpacingsInlie>
          {renderTypeAsLink(props.apiKey, props.apiType, typeLocations)}
          <span>as</span>
          <ContentType>{props.contentType}</ContentType>
        </SpacingsInlie>
      ) : (
        <SpacingsStack>
          <ContentType>{props.contentType}</ContentType>
          <ApiTypeByKey
            apiKey={props.apiKey}
            type={props.apiType}
            doNotRenderExamples
          />
        </SpacingsStack>
      )}
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string,
  isStructuredDataType: PropTypes.bool.isRequired,
  contentType: PropTypes.array.isRequired,
};

export default RequestRepresentation;
