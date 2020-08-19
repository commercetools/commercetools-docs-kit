import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  designSystem,
  MultiCodeBlock,
  CodeBlock,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { tokens, dimensions, typography } from '../../../design-system';
import { useApiTypes } from '../../../hooks/use-api-types';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import Title from './title';

const ResponseCode = styled.span`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.surfacePrimary};
  padding: ${dimensions.spacings.xxs} ${designSystem.dimensions.spacings.s};
  border-radius: ${tokens.borderRadiusForResponseCode};
  line-height: ${typography.lineHeights.responseCode};
`;

const LinkContainer = styled.span`
  margin-left: ${designSystem.dimensions.spacings.s};
  line-height: ${typography.lineHeights.responseBodyType};
`;

const Responses = ({ apiKey, responses, title }) => {
  const typeLocations = useTypeLocations();
  const apiTypes = useApiTypes();

  // extract code examples of all responses
  const codeExamples = [];
  responses.forEach((response) => {
    const typeDisplayName = response.body && response.body.applicationjson.type;
    if (typeDisplayName) {
      const apiType = apiTypes.find((type) => {
        return type.apiKey === apiKey && type.displayName === typeDisplayName;
      });

      if (apiType.examples) {
        codeExamples.push({
          typeDisplayName,
          value: apiType.examples[0].value,
        });
      }
    }
  });

  return (
    <SpacingsStack scale="s">
      <SpacingsInline>
        {title && <Title>{title}:</Title>}

        <div>
          {responses.map((response) => {
            return (
              <p key={response.code}>
                <ResponseCode
                  css={computeStatusCodeBackgroundColor(response.code)}
                >
                  {response.code}
                </ResponseCode>
                <LinkContainer>
                  {response.body
                    ? renderTypeAsLink(
                        apiKey,
                        response.body.applicationjson.type,
                        typeLocations
                      )
                    : 'No body is returned.'}
                </LinkContainer>
              </p>
            );
          })}
        </div>
      </SpacingsInline>

      {codeExamples.map((codeExample) => {
        return (
          <MultiCodeBlock
            key={codeExample.typeDisplayName}
            secondaryTheme={true}
            title={
              codeExamples.length === 1
                ? `Response Example:`
                : `${codeExample.typeDisplayName} Response Example:`
            }
          >
            <CodeBlock language="json" content={codeExample.value} />
          </MultiCodeBlock>
        );
      })}
    </SpacingsStack>
  );
};

function computeStatusCodeBackgroundColor(code) {
  const parsed = parseInt(code, 10);

  if (parsed >= 400 && parsed < 500) {
    return css`
      background-color: #f16d0e;
    `;
  }

  if (parsed >= 500) {
    return css`
      background-color: #e60050;
    `;
  }

  return css`
    background-color: #00ccb4;
  `;
}

Responses.propTypes = {
  apiKey: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      body: PropTypes.object,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default Responses;
