import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Markdown, useISO310NumberFormatter } from '@commercetools-docs/ui-kit';
import { colors, dimensions, typography } from '../design-system';

const customCodeStyle = css`
  border: none;
  background-color: unset;
  padding: 0;
`;

export const Info = styled.span`
  display: inline-block;
  border: 1px solid ${colors.light.borderInfo};
  background-color: ${colors.light.surfaceInfo};
  padding: ${dimensions.spacings.xxs} ${dimensions.spacings.xs};
  font-size: ${typography.fontSizes.small};
`;

export const InfoValue = (props) => {
  const value = props.children;
  const valueType = typeof value;
  const formatNumber = useISO310NumberFormatter();

  switch (valueType) {
    case 'boolean':
      return value ? (
        ''
      ) : (
        <>
          : <Markdown.InlineCode css={customCodeStyle}>No</Markdown.InlineCode>
        </>
      );
    case 'number':
      return (
        <>
          :{' '}
          <Markdown.InlineCode css={customCodeStyle}>
            {formatNumber(value)}
          </Markdown.InlineCode>
        </>
      );
    default:
      return (
        <>
          :{' '}
          <Markdown.InlineCode css={customCodeStyle}>
            {value}
          </Markdown.InlineCode>
        </>
      );
  }
};
InfoValue.propTypes = {
  children: PropTypes.any.isRequired,
};
