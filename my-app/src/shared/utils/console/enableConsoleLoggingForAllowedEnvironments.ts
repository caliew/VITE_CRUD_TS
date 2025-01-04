import { enableLogs } from '../../configs';

const noop = () => null;

const disableLogs = () => {
  // eslint-disable-next-line no-console
  console.log = noop;
  console.warn = noop;
  console.error = noop;
};

/**
 * Enables / Disables Console Logging, depending on the environment.
 *
 * Important for obfuscating app behaviour in non-test environments.
 */
export const enableConsoleLoggingForAllowedEnvironments = () => {
  try {
    if (!enableLogs()) {
      disableLogs();
    }
  } catch (error) {
    // for safety, always disable logs by default, even during errors so that they do not
    // accidentally get turned on
    disableLogs();
  }
};
