import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import { GetIcon } from '@shared/utils';
import { ButtonLINKClasses } from "@shared/utils/classname";
import { Button } from "@shared/components";

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="m-[200px] font-Roboto font-extralight text-2xl w-auto flex flex-col items-center justify-center">
    <div>Something went wrong:</div>
    <div>{error.message}</div>
    <Button Icon={GetIcon("404")} className={ButtonLINKClasses} onClick={resetErrorBoundary}>RELOAD</Button>
  </div>
);

export default ErrorFallback;
