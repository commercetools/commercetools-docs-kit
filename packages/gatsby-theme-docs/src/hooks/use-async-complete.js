import { useContext, useEffect, useState } from 'react';
import ConfigContext, { EFeatureFlag } from '../components/config-context';
import { PageReadyApi } from '../modules/self-learning/components/page-ready-context';

export const useAsyncComplete = (url) => {
  const { selfLearningFeatures } = useContext(ConfigContext);
  const [isAsyncLoading, setAsyncLoading] = useState(false);
  const { addAsyncItem, removeAsyncItem } = useContext(PageReadyApi);

  const isHookEnabled = selfLearningFeatures.includes(EFeatureFlag.PageReady);

  useEffect(() => {
    if (isHookEnabled && url && url !== '') {
      if (!isAsyncLoading) {
        removeAsyncItem(url);
      } else if (isAsyncLoading) {
        addAsyncItem(url);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAsyncLoading]);

  return {
    setAsyncLoading,
  };
};
