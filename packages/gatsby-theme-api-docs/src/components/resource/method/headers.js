import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  designSystem,
  markdownFragmentToReact,
} from '@commercetools-docs/ui-kit';

const HeaderListContainer = styled.div`
  padding: 0 ${designSystem.dimensions.spacings.l};
`;

const HeaderListItem = styled.li`
  padding: ${designSystem.dimensions.spacings.xs} 0px;
`;

const highlightHeader = (header) => `\`${header}\``;

const Headers = (props) => {
  return (
    <SpacingsStack scale="xs">
      <div>Headers:</div>
      <HeaderListContainer>
        <ul>
          {props.headers.map((header, itemImdex) => {
            console.log(header);
            return (
              <HeaderListItem key={itemImdex}>
                <SpacingsInline scale="xs">
                  {markdownFragmentToReact(highlightHeader(header.header))}
                  {header.required && <p>-</p>}
                  {header.required && <p>Required</p>}
                </SpacingsInline>
              </HeaderListItem>
            );
          })}
        </ul>
      </HeaderListContainer>
    </SpacingsStack>
  );
};

Headers.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      builtinType: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
      required: PropTypes.bool,
      pattern: PropTypes.string,
    })
  ).isRequired,
};

export default Headers;
