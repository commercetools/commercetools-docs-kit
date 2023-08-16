import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  designSystem,
  markdownFragmentToReact,
  Markdown,
} from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { tokens, dimensions, typography } from '../../../design-system';
import { useTypeLocations } from '../../../hooks/use-type-locations';
import renderTypeAsLink from '../../../utils/render-type-as-link';
import { convertContentType } from './method';
import Title from './title';

const ResponseCode = styled.span`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.surfacePrimary};
  margin-top: ${dimensions.spacings.xxs};
  padding: ${dimensions.spacings.xxs} ${designSystem.dimensions.spacings.s};
  border-radius: ${tokens.borderRadiusForResponseCode};
  line-height: ${typography.lineHeights.responseCode};
`;

const LinkContainer = styled.span`
  margin-left: ${designSystem.dimensions.spacings.s};
  line-height: ${typography.lineHeights.responseBodyType};
`;

const Responses = ({ apiKey, responses, contentType }) => {
  const typeLocations = useTypeLocations();

  return (
    <SpacingsStack scale="xs">
      <Title>Response:</Title>
      <SpacingsStack scale="s">
        {responses.map((response, index) => {
          const convertedContentType = convertContentType(contentType[index]);
          const responseDetails =
            response.body &&
            renderTypeAsLink(
              apiKey,
              response.body[contentType[index]].type,
              typeLocations,
              convertedContentType
            );
          // If renderTypeAsLink returns the type again and a description is defined, we display the description.
          // In this case, the content type should not be displayed at the moment.
          const isDescription =
            responseDetails === response.body?.[contentType[index]].type &&
            response.description;
          return (
            <SpacingsInline key={response.code}>
              <ResponseCode
                css={computeStatusCodeBackgroundColor(response.code)}
              >
                {response.code}
              </ResponseCode>
              <LinkContainer>
                {responseDetails ? (
                  <SpacingsInline alignItems="center">
                    {isDescription
                      ? markdownFragmentToReact(response.description)
                      : responseDetails}
                    {contentType.length > 0 && !isDescription && (
                      <>
                        <span>as</span>
                        <Markdown.InlineCodeWithoutBox>
                          {convertedContentType}
                        </Markdown.InlineCodeWithoutBox>
                      </>
                    )}
                  </SpacingsInline>
                ) : (
                  markdownFragmentToReact(response.description) ||
                  'No body is returned.'
                )}
              </LinkContainer>
            </SpacingsInline>
          );
        })}
      </SpacingsStack>
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
  contentType: PropTypes.array.isRequired,
};

export default Responses;
