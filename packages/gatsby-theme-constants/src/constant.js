import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import {
  ContentNotifications,
  useISO310NumberFormatter,
  Markdown,
  designSystem,
} from '@commercetools-docs/ui-kit';
import useConstant from './use-constant';

const customCodeStyle = css`
  color: ${designSystem.colors.light.textPrimary};
`;

const Constant = (props) => {
  const formatNumber = useISO310NumberFormatter();
  const constantValue = useConstant(props.type, props.name);

  if (!constantValue) {
    const message = `The constant ${props.name} of type ${props.type} was not found.`;
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }
    throw new Error(message);
  }

  return (
    <Markdown.InlineCodeWithoutBox css={customCodeStyle}>
      {constantValue.number ? formatNumber(constantValue.number) : ''}
      {constantValue.text && constantValue.number ? <>&nbsp;</> : ''}
      {constantValue.text || ''}
    </Markdown.InlineCodeWithoutBox>
  );
};

Constant.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Constant;
