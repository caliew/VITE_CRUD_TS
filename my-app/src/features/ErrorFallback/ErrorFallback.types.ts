export interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}