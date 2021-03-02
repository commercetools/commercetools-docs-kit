import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications, formatNumber } from '@commercetools-docs/ui-kit';
import useConstant from './use-constant';

const Constant = (props) => {
  const constantValue = useConstant(props.type, props.name);

  if (!constantValue) {
    const message = `The constant ${props.name} of type ${props.type} was not found.`;
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }
    throw new Error(message);
  }

  return (
    <>
      {formatNumber(constantValue.number) || ''}
      {constantValue.text && constantValue.number ? <>&nbsp;</> : ''}
      {constantValue.text || ''}
    </>
  );
};

Constant.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Constant;
