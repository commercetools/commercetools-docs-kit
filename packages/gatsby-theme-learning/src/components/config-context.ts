import { createContext } from 'react';

export type Config = {
  learnApiBaseUrl: string;
  auth0Domain: string;
  features: {
    courseStatusIndicator: boolean;
  };
};

const ConfigContext = createContext<Config>({
  learnApiBaseUrl: '',
  auth0Domain: '',
  features: {
    courseStatusIndicator: false,
  },
});

export default ConfigContext;
