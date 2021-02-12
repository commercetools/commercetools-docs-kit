/* eslint-disable react/prop-types,class-methods-use-this */
import { Component } from 'react';
import reportErrorToSentry from '../utils/report-error-to-sentry';

class ErrorBoundary extends Component {
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
