/* eslint-disable react/prop-types,class-methods-use-this */
import React from 'react';
import * as Sentry from '@sentry/browser';

const reportErrorToSentry = (error, extraInfo) => {
  // logs error to sentry
  Sentry.withScope(scope => {
    if (extraInfo && extraInfo.extra) {
      if (typeof extraInfo.extra === 'object') {
        // See https://docs.sentry.io/platforms/javascript/react/
        scope.setExtras(extraInfo.extra);
      } else {
        scope.setExtra('extra', extraInfo.extra);
      }
    }
    // Generate a unique ID referring to the last generated Sentry error
    const errorId =
      error instanceof Error
        ? Sentry.captureException(error)
        : Sentry.captureMessage(error);

    // The error stack should be available in Sentry, so there is no
    // need to print it in the console as well.
    // We just notify that an error occurred and provide the error ID.
    console.error(`[SENTRY]: An error occured (ID: ${errorId}).`);
  });
};

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(/* error */) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    reportErrorToSentry(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <div>{'Unable to load view.'}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
