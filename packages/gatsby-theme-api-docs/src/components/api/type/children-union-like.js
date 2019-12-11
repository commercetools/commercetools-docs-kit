import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Card from '@commercetools-uikit/card';
import { Markdown } from '@commercetools-docs/gatsby-theme-docs';
import Children from './children';

const ChildrenUnionLike = ({ apiType, apiTypeSubTypes, strings }) => {
  return (
    <Card>
      <p
        css={css`
          margin-top: 1em;
        `}
      >
        {apiType.description}
      </p>

      {apiTypeSubTypes.map(subType => (
        <div
          key={subType.key}
          css={css`
            margin-top: 1em;
          `}
        >
          <Markdown.H3>{subType.name}</Markdown.H3>
          <Children
            apiType={subType}
            parentDiscriminator={apiType.discriminator}
            strings={strings}
          />
        </div>
      ))}
    </Card>
  );
};

ChildrenUnionLike.propTypes = {
  apiType: PropTypes.object.isRequired,
  apiTypeSubTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  strings: PropTypes.object,
};

export default ChildrenUnionLike;
