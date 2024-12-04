import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }: any) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleErrors = (error:any) => {
      setHasError(true);
      setError(error);
    };
    window.addEventListener('error', handleErrors);
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    return (
      <div className='font-Roboto font-extralight text-2xl bg-color-2'>
        <h1>Something went wrong.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;