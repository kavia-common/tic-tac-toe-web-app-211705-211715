import React from 'react';
import { auditLog } from '../utils/auditTrail';

/**
 * PUBLIC_INTERFACE
 * ErrorBoundary: Catches errors in child component tree and shows a graceful message.
 * Logs errors to client-side audit trail.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'An unexpected error occurred.' };
  }

  componentDidCatch(error, errorInfo) {
    auditLog({
      userId: 'anonymous',
      action: 'ERROR',
      details: {
        message: error?.message,
        stack: errorInfo?.componentStack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card error-card" role="alert" aria-live="assertive">
          <h2 className="title" style={{ color: 'var(--error)' }}>Something went wrong.</h2>
          <p className="description">Please try again or navigate to a different page.</p>
          <details style={{ whiteSpace: 'pre-wrap', opacity: 0.7 }}>
            {this.state.message}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
