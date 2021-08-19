import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { DescriptionText } from '../description';

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
          const enumDescription =
            enumDescriptions &&
            enumDescriptions.find((enumDesc) => enumDesc.name === value);

          return (
            <React.Fragment key={value}>
              <Markdown.Dt>{value}</Markdown.Dt>
              {enumDescription && enumDescription.description && (
                <Markdown.Dd>
                  <DescriptionText
                    markdownString={enumDescription.description}
                  />
                </Markdown.Dd>
              )}
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
