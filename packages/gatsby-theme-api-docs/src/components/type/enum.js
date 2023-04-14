import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { DescriptionText, DescriptionParagraph } from '../description';

const Enum = ({
  values,
  enumDescriptions,
  enumGroups,
  description,
  displayName,
  anchor,
}) => {
  if (!values) {
    throw new Error(
      'Must pass values props to Enum component --- <Enum values={<Array>} />.'
    );
  }

  if (enumGroups) {
    let groupList = enumGroups.reduce((list, group) => {
      if (!Object.keys(list).includes(group.description)) {
        return { ...list, [group.description]: [] };
      }
      return { ...list };
    }, {});

    enumGroups.forEach((enumValue) => {
      groupList[enumValue.description].push(enumValue.name);
      groupList[enumValue.description].sort();
    });

    return (
      <div aria-label={`${displayName} definition`} id={anchor}>
        <SpacingsStack scale="m">
          {description && (
            <DescriptionParagraph>{description}</DescriptionParagraph>
          )}
          <Markdown.Dl>
            <SpacingsStack scale="l">
              {Object.keys(groupList)
                .sort()
                .map((groupName) => {
                  return (
                    <div key={groupName}>
                      <Markdown.Dl>
                        <Markdown.H4>{groupName}</Markdown.H4>
                        {values &&
                          groupList[groupName].map((value) => {
                            console.log(groupList[groupName]);
                            const enumDescription =
                              enumDescriptions &&
                              enumDescriptions.find(
                                (enumDesc) => enumDesc.name === value
                              );
                            return (
                              <React.Fragment key={value}>
                                <Markdown.Dt>
                                  <Markdown.InlineCode>
                                    {value}
                                  </Markdown.InlineCode>
                                </Markdown.Dt>
                                {enumDescription &&
                                  enumDescription.description && (
                                    <Markdown.Dd>
                                      <DescriptionText
                                        markdownString={
                                          enumDescription.description
                                        }
                                      />
                                    </Markdown.Dd>
                                  )}
                              </React.Fragment>
                            );
                          })}
                      </Markdown.Dl>
                    </div>
                  );
                })}
            </SpacingsStack>
          </Markdown.Dl>{' '}
        </SpacingsStack>
      </div>
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
                <React.Fragment key={value}>
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
                </React.Fragment>
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
  enumGroups: PropTypes.arrayOf(
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
