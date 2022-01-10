import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import { DescriptionText } from '../description';

const hasDescriptions = (enumDescriptions) => {
  return (
    enumDescriptions &&
    enumDescriptions.some(
      (enumDesc) => enumDesc.description && enumDesc.description.length > 0
    )
  );
};

const Enum = ({ values, enumDescriptions }) => {
  if (!values) {
    throw new Error(
      'Must pass values props to Enum component --- <Enum values={<Array>} />.'
    );
  }
  if (hasDescriptions(enumDescriptions)) {
    return (
      <Markdown.Table>
        <Markdown.TableRow>
          <Markdown.TableHeader>Value</Markdown.TableHeader>
          <Markdown.TableHeader>Description</Markdown.TableHeader>
        </Markdown.TableRow>
        {values &&
          values.map((value) => {
            const enumDescription = enumDescriptions.find(
              (enumDesc) => enumDesc.name === value
            );
            return (
              <Markdown.TableRow key={value}>
                <Markdown.TableCell>
                  <Markdown.InlineCode>{value}</Markdown.InlineCode>
                </Markdown.TableCell>
                <Markdown.TableCell>
                  {enumDescription && (
                    <DescriptionText
                      markdownString={enumDescription.description}
                    />
                  )}
                </Markdown.TableCell>
              </Markdown.TableRow>
            );
          })}
      </Markdown.Table>
    );
  } else {
    return (
      <Markdown.Ul>
        {values.map((value) => (
          <Markdown.Li key={value}>
            <Markdown.InlineCode>{value}</Markdown.InlineCode>
          </Markdown.Li>
        ))}
      </Markdown.Ul>
    );
  }
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
