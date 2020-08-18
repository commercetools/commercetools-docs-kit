import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { MultiCodeBlock, CodeBlock } from '@commercetools-docs/ui-kit';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';

import Title from './title';

const RequestRepresentation = (props) => {
  const typeLocations = useTypeLocations();

  return (
    <SpacingsStack scale="s">
      <SpacingsInline>
        <Title>Request Body:</Title>{' '}
        {renderTypeAsLink(props.apiKey, props.apiType, typeLocations)}
      </SpacingsInline>

      {props.codeExamples && (
        <MultiCodeBlock title={`Request Example:`}>
          {props.codeExamples.map((example) => (
            <CodeBlock
              key={example.language}
              language={example.language}
              content={example.value}
            />
          ))}
        </MultiCodeBlock>
      )}
    </SpacingsStack>
  );
};

RequestRepresentation.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.string.isRequired,
  codeExamples: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default RequestRepresentation;
