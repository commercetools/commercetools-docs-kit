import React from 'react';
import PropTypes from 'prop-types';
import { values as valuesStr } from '../../../utils/constants';
import Description from './description';

const Enum = ({ description, values, dataTestId }) => {
  if (!(description && description.text) && !values) {
    throw new Error('Must pass description or values props to Enum component.');
  }

  return (
    <div data-testid={dataTestId || null}>
      {description && description.text ? (
        <Description description={description.text} title={description.title} />
      ) : null}

      {values ? (
        <p>
          {valuesStr}: {values.join(', ')}
        </p>
      ) : null}
    </div>
  );
};

Enum.propTypes = {
  description: PropTypes.shape({
    text: PropTypes.string,
    title: PropTypes.string,
  }),
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  dataTestId: PropTypes.string,
};

export default Enum;
