import { useContext, useEffect, useState } from 'react';
import { LearningContext } from '../modules/self-learning';
import useIsClientSide from './use-is-client-side';

export const useAsyncComplete = (url) => {
  const [isAsyncLoading, setAsyncLoading] = useState(false);
  const { isClientSide } = useIsClientSide();
  const {
    updateAsyncRequest,
    ui: { asyncRequest },
  } = useContext(LearningContext);
  const isCI = Cypress.env('CI') === true;

  useEffect(() => {
    if (isCI && isClientSide && url && url !== '') {
      updateAsyncRequest({ url, isLoading: isAsyncLoading });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAsyncLoading]);

  useEffect(() => {
    if (
      isCI &&
      isClientSide &&
      !Object.values(asyncRequest).find((value) => value === true)
    ) {
      document.body.setAttribute('data-test-ready', 'true');
    } else if (
      isCI &&
      isClientSide &&
      Object.values(asyncRequest).find((value) => value === true)
    ) {
      document.body.setAttribute('data-test-ready', 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncRequest]);

  return {
    setAsyncLoading,
  };
};
