import ConfigContext from './src/components/config-context';

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
