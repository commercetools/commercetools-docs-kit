import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { MultiCodeBlock, CodeBlock } from '@commercetools-docs/ui-kit';
import { useApiTypes } from '../../../hooks/use-api-types';

const RequestResponseExamples = (props) => {
  // extract code examples of all responses
  const apiTypes = useApiTypes();
  const responsesCodeExamples = [];
  if (props.responses) {
    props.responses.forEach((response) => {
      const typeDisplayName =
        response.body && response.body.applicationjson.type;
      const { code } = response;
      if (typeDisplayName) {
        const apiType = apiTypes.find((type) => {
          return (
            type.apiKey === props.apiKey && type.displayName === typeDisplayName
          );
        });

        const examplesNode = response.body?.applicationjson?.examples;

        if (examplesNode && Array.isArray(examplesNode)) {
          examplesNode.forEach((example) => {
            responsesCodeExamples.push({
              code,
              typeDisplayName:
                examplesNode.length === 1
                  ? typeDisplayName
                  : `${typeDisplayName} (${example.name})`,
              value: example.value,
            });
          });
        } else if (apiType.examples && apiType.examples.length > 0) {
          responsesCodeExamples.push({
            code,
            typeDisplayName,
            value: apiType.examples[0].value,
          });
        }
      }
    });
  }

  return (
    <SpacingsStack scale="s" data-is-wide-sticky="true">
      {props.requestCodeExamples && (
        <MultiCodeBlock title={`Request Example:`}>
          {props.requestCodeExamples.map((example) => (
            <CodeBlock
              key={example.language}
              language={example.language}
              content={example.value}
            />
          ))}
        </MultiCodeBlock>
      )}

      {responsesCodeExamples.map((codeExample) => {
        return (
          <MultiCodeBlock
            key={`${codeExample.code}-${codeExample.typeDisplayName}`}
            secondaryTheme={true}
            title={`${codeExample.code} Response Example: ${codeExample.typeDisplayName}`}
          >
            <CodeBlock language="json" content={codeExample.value} />
          </MultiCodeBlock>
        );
      })}
    </SpacingsStack>
  );
};

RequestResponseExamples.propTypes = {
  apiKey: PropTypes.string,
  requestCodeExamples: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ),
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      body: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.shape({
          applicationjson: PropTypes.shape({
            builtinType: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }),
        }),
      ]),
    }).isRequired
  ),
};

export default RequestResponseExamples;
