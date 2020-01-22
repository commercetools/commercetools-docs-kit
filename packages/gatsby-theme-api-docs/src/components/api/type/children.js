import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Enum from './enum';
import Properties from './properties/properties';
import Examples from './examples';

const Children = ({ apiType, parentDiscriminator, strings }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
  >
    {apiType.enumeration || apiType.description ? (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Enum
          description={{
            text: apiType.description,
          }}
          values={apiType.enumeration}
        />
      </div>
    ) : null}

    {apiType.properties ? (
      <div
        css={css`
          margin: 1rem 0;
        `}
      >
        <Properties
          apiType={apiType}
          parentDiscriminator={parentDiscriminator}
        />
      </div>
    ) : null}

    {apiType.examples ? (
      <div
        css={css`
          margin: 1rem 0;
        `}
      >
        <Examples
          examples={apiType.examples}
          title={
            apiType.examples.length > 1 ? strings.examples : strings.example
          }
        />
      </div>
    ) : null}
  </div>
);

Children.propTypes = {
  apiType: PropTypes.object.isRequired,
  parentDiscriminator: PropTypes.string,
  strings: PropTypes.object,
};

export default Children;
