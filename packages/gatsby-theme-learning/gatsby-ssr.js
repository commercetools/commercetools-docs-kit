import React from 'react';
import ConfigContext from './src/components/config-context';
import { PortalsContainer } from '@commercetools-docs/ui-kit';
import { css } from '@emotion/react';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        features: {
          courseStatusIndicator:
            pluginOptions?.features?.courseStatusIndicator || false,
        },
      }}
    >
      {element}
    </ConfigContext.Provider>
  );
};

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <PortalsContainer />
      {element}
    </>
  );
};
