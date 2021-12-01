import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { BetaFlag } from '@commercetools-docs/gatsby-theme-docs';
import { typography } from '../../../../design-system';
import useTypeToRender from '../../../../hooks/use-type-to-render';
import Required from '../../../required';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  white-space: nowrap;
  line-height: ${typography.lineHeights.propertyType};
`;
const PropertyType = styled.div`
  line-height: ${typography.lineHeights.propertyType};
  color: ${designSystem.colors.light.textFaded};
`;
const BetaWrapper = styled.span`
  font-size: ${typography.fontSizes.body};
`;

const NameType = (props) => {
  const typeToRender = useTypeToRender({
    property: props.property,
    apiKey: props.apiKey,
  });

  const isRegex = (string) =>
    string.charAt(0) === '/' && string.charAt(string.length - 1) === '/';

  const getExpressionInsideSlashes = (input) => {
    return input.match(/\/([^;]*)\//);
  };

  return (
    <SpacingsStack scale="xs">
      <PropertyName>
        <SpacingsInline scale="xs">
          {isRegex(props.property.name) ? (
            <Markdown.InlineCode>
              <span
                css={css`
                  color: ${designSystem.colors.light.textInfo};
                `}
              >
                /
              </span>
              {getExpressionInsideSlashes(props.property.name)[1]}
              <span
                css={css`
                  color: ${designSystem.colors.light.textInfo};
                `}
              >
                /
              </span>
            </Markdown.InlineCode>
          ) : (
            <Markdown.InlineCode>{props.property.name}</Markdown.InlineCode>
          )}
          {props.property.required && <Required />}
          {props.property.beta && (
            <BetaWrapper>
              <BetaFlag />
            </BetaWrapper>
          )}
        </SpacingsInline>
      </PropertyName>
      {'\u200B' /* zero-width space for the search crawler */}
      <PropertyType>
        {typeToRender.displayPrefix && typeToRender.displayPrefix}

        {isRegex(props.property.name)
          ? 'Any property matching regular expression above'
          : typeof typeToRender.type === 'string'
          ? typeToRender.type
          : typeToRender.type}
      </PropertyType>
      {'\u200B' /* zero-width space for the search crawler */}
    </SpacingsStack>
  );
};

NameType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
    required: PropTypes.bool.isRequired,
    beta: PropTypes.bool,
  }).isRequired,
};

export default NameType;
