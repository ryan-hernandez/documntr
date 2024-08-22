import React from 'react';

/**
 * ErrorBoundary is a React component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI when an error occurs.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state based on the occurrence of an error.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {Object|null} - Returns an object to update state, or null to indicate no change.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Logs the error and error information to the console.
   *
   * @param {Error} error - The uncaught error.
   * @param {ErrorInfo} errorInfo - Information about the error, such as component stack trace.
   */
  componentDidCatch(error, errorInfo) {
    console.log('Uncaught error:', error, errorInfo);
  }

  /**
   * Renders the fallback UI if an error has occurred; otherwise, renders the child components.
   *
   * @returns {React.Element} - The rendered output, either the fallback UI or the children.
   */
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page and try again.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
