import { createContext } from 'react';

export type Config = {
  learnApiBaseUrl: string;
  auth0Domain: string;
};

const ConfigContext = createContext<Config>({
  learnApiBaseUrl: '',
  auth0Domain: '',
});

export default ConfigContext;
