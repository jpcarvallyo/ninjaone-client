import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      // You can also log the error to an error reporting service
      console.error("Error caught by error boundary:", error, errorInfo);
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return hasError ? (
    <h1>Something went wrong. Please try again later.</h1>
  ) : (
    children
  );
};

export default ErrorBoundary;
