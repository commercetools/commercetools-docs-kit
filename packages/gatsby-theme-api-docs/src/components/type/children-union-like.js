import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown } from '@commercetools-docs/ui-kit';
import Description from '../description';
import Children from './children';
import { generateTypeURN } from '../../utils/ctp-urn';

const Heading = Markdown.withAnchorLink(Markdown.H4);

const ChildrenUnionLike = (props) => {
  return (
    <SpacingsStack scale="m">
      {props.apiType.description && (
        <Description>{props.apiType.description}</Description>
      )}

      <SpacingsStack scale="m">
        {props.apiTypeSubTypes.map((subType) => {
          return (
            <SpacingsStack key={subType.displayName} scale="s">
              <Heading id={generateTypeURN(subType)}>
                {subType.displayName}
              </Heading>
              <Children
                apiKey={props.apiKey}
                apiType={subType}
                doNotRenderExamples={props.doNotRenderExamples}
                hideInheritedProperties={props.hideInheritedProperties}
              />
            </SpacingsStack>
          );
        })}
      </SpacingsStack>
    </SpacingsStack>
  );
};

ChildrenUnionLike.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
  apiTypeSubTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  doNotRenderExamples: PropTypes.bool,
  hideInheritedProperties: PropTypes.bool,
};

export default ChildrenUnionLike;
