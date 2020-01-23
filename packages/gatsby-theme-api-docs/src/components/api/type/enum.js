import React from 'react';
import PropTypes from 'prop-types';
import { values as valuesStr } from '../../../utils/constants';
import markdownToReact from '../../../utils/markdown-to-react';

const Enum = ({ description, values }) => {
  if (!description && !values) {
    throw new Error('Must pass description or values props to Enum component.');
  }

  return (
    <div>
      {description ? markdownToReact(description) : null}

      {values ? (
        <p>
          {valuesStr}: {values.join(', ')}
        </p>
      ) : null}
    </div>
  );
};

Enum.propTypes = {
  description: PropTypes.string,
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default Enum;
