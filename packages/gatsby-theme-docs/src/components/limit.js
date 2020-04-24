import React from 'react';
import PropTypes from 'prop-types';
import { ContentNotifications } from '@commercetools-docs/ui-kit';
import useLimitsByName from '../hooks/use-limits-by-name';

const Limit = (props) => {
  const limit = useLimitsByName(props.name);

  if (!limit) {
    const message = `${props.name} limit is not found.`;

    if (process.env.NODE_ENV !== 'production') {
      return <ContentNotifications.Error>{message}</ContentNotifications.Error>;
    }

    throw new Error(message);
  }

  return <>{limit.value}</>;
};

Limit.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Limit;
