import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { ErrorFallbackProps } from './ErrorFallback.types';

const ErrorFallback: React.ComponentType<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" 
         className='font-Roboto font-extralight text-2xl m-10 flex items-center'>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ErrorFallback;
