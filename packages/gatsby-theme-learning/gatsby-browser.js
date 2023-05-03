import ConfigContext from './src/components/config-context';
import { SWRConfig } from 'swr';
import { LearningStateProvider } from './src/components/learning-context';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        features: pluginOptions?.features || [],
      }}
    >
      <LearningStateProvider>
        <SWRConfig>{element}</SWRConfig>
      </LearningStateProvider>
    </ConfigContext.Provider>
  );
};
