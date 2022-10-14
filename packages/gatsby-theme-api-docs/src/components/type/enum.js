import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { DescriptionText, DescriptionParagraph } from '../description';

const Enum = ({
  values,
  enumDescriptions,
  description,
  displayName,
  anchor,
}) => {
  if (!values) {
    throw new Error(
      'Must pass values props to Enum component --- <Enum values={<Array>} />.'
    );
  }

  return (
    <div aria-label={`${displayName} definition`} id={anchor}>
      <SpacingsStack scale="m">
        {description && (
          <DescriptionParagraph>{description}</DescriptionParagraph>
        )}
        <Markdown.Dl>
          {values &&
            values.map((value) => {
              const enumDescription =
                enumDescriptions &&
                enumDescriptions.find((enumDesc) => enumDesc.name === value);

              return (
                <Fragment key={value}>
                  <Markdown.Dt>
                    <Markdown.InlineCode>{value}</Markdown.InlineCode>
                  </Markdown.Dt>
                  {enumDescription && enumDescription.description && (
                    <Markdown.Dd>
                      <DescriptionText
                        markdownString={enumDescription.description}
                      />
                    </Markdown.Dd>
                  )}
                </Fragment>
              );
            })}
        </Markdown.Dl>{' '}
      </SpacingsStack>
    </div>
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
  description: PropTypes.string,
  displayName: PropTypes.string,
  anchor: PropTypes.string,
};

export default Enum;
