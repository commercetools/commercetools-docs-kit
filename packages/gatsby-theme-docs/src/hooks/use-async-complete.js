import { useContext, useEffect, useState } from 'react';
import { LearningContext } from '../modules/self-learning';
import ConfigContext, { EFeatureFlag } from '../components/config-context';

const DATA_TEST_READY_ATT_NAME = 'data-test-page-ready';

export const useAsyncComplete = (url) => {
  const { selfLearningFeatures } = useContext(ConfigContext);
  const [isAsyncLoading, setAsyncLoading] = useState(false);
  const {
    updateAsyncRequest,
    ui: { asyncRequest },
  } = useContext(LearningContext);

  const isHookEnabled = selfLearningFeatures.includes(EFeatureFlag.PageReady);

  useEffect(() => {
    if (isHookEnabled && url && url !== '') {
      updateAsyncRequest({ url, isLoading: isAsyncLoading });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAsyncLoading]);

  useEffect(() => {
    if (!isHookEnabled) {
      return;
    }
    if (!Object.values(asyncRequest).find((value) => value === true)) {
      document.body.setAttribute(DATA_TEST_READY_ATT_NAME, 'true');
    } else {
      document.body.setAttribute(DATA_TEST_READY_ATT_NAME, 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncRequest]);

  return {
    setAsyncLoading,
  };
};
