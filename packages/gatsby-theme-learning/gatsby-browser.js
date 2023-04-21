import React from 'react';
import ConfigContext from './src/components/config-context';
import { LearningStateProvider } from './src/components/learning-context';
const isProduction = process.env.GATSBY_NODE_ENV === 'production';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        features: pluginOptions?.features || [],
        env: isProduction ? 'production' : 'testing',
      }}
    >
      <LearningStateProvider>{element}</LearningStateProvider>
    </ConfigContext.Provider>
  );
};
