import { useContext, useEffect } from 'react';
import { PageReadyState } from './page-ready-context';
import ConfigContext, {
  EFeatureFlag,
} from '../../../components/config-context';

const PageReady = () => {
  const urls = useContext(PageReadyState);
  const { selfLearningFeatures } = useContext(ConfigContext);

  const isPageReadyEnabled = selfLearningFeatures.includes(
    EFeatureFlag.PageReady
  );

  return isPageReadyEnabled ? (
    <div data-test-page-ready={urls.length === 0 ? 'true' : 'false'} />
  ) : null;
};

export default PageReady;
