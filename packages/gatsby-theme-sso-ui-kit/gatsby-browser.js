import { Auth0Provider } from '@auth0/auth0-react';
import ConfigContext from './src/components/config-context';

const onRedirectCallback = (appState) => {
  window.location.replace(appState.returnTo);
};

export const wrapRootElement = ({ element }, pluginOptions) => {
  const isPluginEnabled =
    pluginOptions.auth0Domain && pluginOptions.auth0ClientId;
  const audience =
    isPluginEnabled && pluginOptions.auth0Domain === 'auth.id.commercetools.com'
      ? 'commercetools.eu.auth0.com'
      : pluginOptions.auth0Domain;

  return isPluginEnabled ? (
    <ConfigContext.Provider
      value={{
        learnApiBaseUrl: pluginOptions.learnApiBaseUrl,
        auth0Domain: pluginOptions.auth0Domain,
        auth0ClientId: pluginOptions.auth0ClientId,
      }}
    >
      <Auth0Provider
        domain={pluginOptions.auth0Domain}
        clientId={pluginOptions.auth0ClientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={`https://${audience}/api/v2/`}
      >
        {element}
      </Auth0Provider>
    </ConfigContext.Provider>
  ) : (
    <>{element}</>
  );
};
