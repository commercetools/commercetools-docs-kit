import ConfigContext from './src/components/config-context';

export const wrapRootElement = ({ element }, pluginOptions) => {
  const isPluginEnabled =
    pluginOptions.auth0Domain && pluginOptions.auth0ClientId;

  return isPluginEnabled ? (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        auth0ClientId: pluginOptions.auth0ClientId,
        hideLogin: pluginOptions.hideLogin || false,
      }}
    >
      {element}
    </ConfigContext.Provider>
  ) : (
    <>{element}</>
  );
};
