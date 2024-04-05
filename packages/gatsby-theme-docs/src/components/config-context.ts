import { createContext } from 'react';

export enum EFeatureFlag {
  CourseStatus = 'status-indicator',
  CompleteProfileModal = 'complete-profile-modal',
  PageReady = 'page-ready',
  TabsSessionSync = 'tabs-session-sync',
}

export type Config = {
  learnApiBaseUrl: string;
  auth0Domain: string;
  auth0ClientId: string;
  hideLogin: boolean;
  selfLearningFeatures: Array<EFeatureFlag>;
  aiAssistantApiBaseUrl: string;
  aiAssistantTopbarButton: boolean;
  enableCanonicalUrls: boolean;
};

const ConfigContext = createContext<Config>({
  learnApiBaseUrl: '',
  auth0Domain: '',
  auth0ClientId: '',
  hideLogin: false,
  selfLearningFeatures: [],
  aiAssistantApiBaseUrl: '',
  aiAssistantTopbarButton: false,
  enableCanonicalUrls: false,
});

export const isFeatureEnabled = (
  feature: EFeatureFlag,
  features: EFeatureFlag[]
) => features.includes(feature);

export default ConfigContext;
