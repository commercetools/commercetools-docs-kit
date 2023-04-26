import { createContext } from 'react';

export type Config = {
  learnApiBaseUrl: string;
  auth0Domain: string;
  auth0ClientId: string;
  hideLogin: boolean;
};

const ConfigContext = createContext<Config>({
  learnApiBaseUrl: '',
  auth0Domain: '',
  auth0ClientId: '',
  hideLogin: false,
});

export default ConfigContext;
