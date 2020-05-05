import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import { useDataLimitByName } from './use-data-limits';

const DataLimit = (props) => {
  const limit = useDataLimitByName(props.name);

  if (!limit) {
    const message = `${props.name} limit was not found.`;
    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }
    throw new Error(message);
  }

  return (
    <>
      {limit.number || ''}
      {limit.text && limit.number ? <>&nbsp;</> : ''}
      {limit.text || ''}
    </>
  );
};

DataLimit.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DataLimit;
