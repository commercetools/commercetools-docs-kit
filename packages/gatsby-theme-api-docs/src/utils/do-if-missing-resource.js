import React from 'react';
import { ContentNotifications } from '@commercetools-docs/ui-kit';

function doIfMissingResource(apiKey, resource) {
  const errorMsg = `Resource '${resource}' not found in '${apiKey}' API`;

  if (__DEVELOPMENT__) {
    return <ContentNotifications.Error>{errorMsg}</ContentNotifications.Error>;
  }

  throw new Error(errorMsg);
}

export default doIfMissingResource;
