import React from 'react';
import ConfigContext from './src/components/config-context';
import { PortalsContainer } from '@commercetools-docs/ui-kit';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        features: pluginOptions?.features || [],
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
