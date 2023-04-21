import { createContext } from 'react';

export enum EFeatureFlag {
  CourseStatus = 'status-indicator',
  CompleteProfileModal = 'complete-profile-modal',
}

export type Config = {
  learnApiBaseUrl: string;
  auth0Domain: string;
  features: Array<EFeatureFlag>;
  env: 'production' | 'testing';
};

const ConfigContext = createContext<Config>({
  learnApiBaseUrl: '',
  auth0Domain: '',
  features: [],
  env: 'testing',
});

export const isFeatureEnabled = (
  feature: EFeatureFlag,
  features: EFeatureFlag[]
) => features.includes(feature);

export default ConfigContext;
