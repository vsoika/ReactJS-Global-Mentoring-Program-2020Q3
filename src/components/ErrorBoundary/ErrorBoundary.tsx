import React, { Component } from "react";

interface IErrorBoundaryState {
  isError: boolean;
  error: React.ErrorInfo;
  errorInfo: React.ErrorInfo;
}

class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
  state = {
    isError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo: React.ErrorInfo): void {
    this.setState({
      isError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="pt-3 pl-3 error-message">
          <h1>Oops!!! Something went wrong</h1>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occured: {this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
