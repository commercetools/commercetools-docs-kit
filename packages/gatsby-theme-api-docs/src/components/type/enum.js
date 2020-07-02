import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';

const Enum = ({ values, enumDescriptions }) => {
  if (!values) {
    throw new Error(
      'Must pass values props to Enum component --- <Enum values={<Array>} />.'
    );
  }

  return (
    <Markdown.Dl>
      {values &&
        values.map((value) => {
          const description =
            enumDescriptions &&
            enumDescriptions.find(
              (enumDescription) => enumDescription.name === value
            ).description;

          return (
            <React.Fragment key={value}>
              <Markdown.Dt>{value}</Markdown.Dt>
              <Markdown.Dd>{description}</Markdown.Dd>
            </React.Fragment>
          );
        })}
    </Markdown.Dl>
  );
};

Enum.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  enumDescriptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default Enum;
