import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
  Markdown,
  useISO310NumberFormatter,
  designSystem,
} from '@commercetools-docs/ui-kit';

const InfoValue = (props) => {
  const value = props.children;
  const valueType = props.type || typeof value;
  const formatNumber = useISO310NumberFormatter();

  const customCodeStyle = css`
    font-size: ${designSystem.typography.fontSizes.small};
  `;

  switch (valueType) {
    case 'boolean':
      // We want to show the actual boolean value for the query parameter defaults.
      return props.isQueryParameter ? (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            {value}
          </Markdown.InlineCodeWithoutBox>
        </>
      ) : value ? (
        ''
      ) : (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            No
          </Markdown.InlineCodeWithoutBox>
        </>
      );
    case 'number':
      return (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            {formatNumber(value)}
          </Markdown.InlineCodeWithoutBox>
        </>
      );
    default:
      return (
        <>
          :{' '}
          <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
            {value}
          </Markdown.InlineCodeWithoutBox>
        </>
      );
  }
};

InfoValue.propTypes = {
  type: PropTypes.string,
  isQueryParameter: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

export default InfoValue;
