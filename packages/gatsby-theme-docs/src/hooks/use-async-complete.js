import { useContext, useEffect, useState } from 'react';
import { LearningContext } from '../modules/self-learning';
import useIsClientSide from './use-is-client-side';
import ConfigContext, { EFeatureFlag } from '../components/config-context';

export const useAsyncComplete = (url) => {
  const { selfLearningFeatures } = useContext(ConfigContext);
  const [isAsyncLoading, setAsyncLoading] = useState(false);
  const { isClientSide } = useIsClientSide();
  const {
    updateAsyncRequest,
    ui: { asyncRequest },
  } = useContext(LearningContext);

  const isHookEnabled =
    selfLearningFeatures.includes(EFeatureFlag.PageReady) && isClientSide;

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
      document.body.setAttribute('data-test-ready', 'true');
    } else {
      document.body.setAttribute('data-test-ready', 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncRequest]);

  return {
    setAsyncLoading,
  };
};
