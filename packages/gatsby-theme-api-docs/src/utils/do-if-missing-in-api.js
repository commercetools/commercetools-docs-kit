import React from 'react';
import { ContentNotifications } from '@commercetools-docs/ui-kit';

function doIfMissingInApi(errorMsg) {
  if (process.env.NODE_ENV !== 'production') {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

export default doIfMissingInApi;
